require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Inject Paystack public key safely into the frontend
app.get('/config.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`window.PAYSTACK_PUBLIC_KEY = ${JSON.stringify(process.env.PAYSTACK_PUBLIC_KEY || '')};`);
});

// Verify Paystack payment and return WhatsApp redirect URL
app.post('/api/verify-payment', async (req, res) => {
  const { reference, orderDetails } = req.body;

  if (!reference || !orderDetails) {
    return res.status(400).json({ success: false, message: 'Missing reference or order details' });
  }

  try {
    const paystackRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const transaction = paystackRes.data.data;

    if (transaction.status !== 'success') {
      return res.json({ success: false, message: 'Payment was not successful' });
    }

    // Build WhatsApp order message
    const { name, phone, address, items, total } = orderDetails;

    const itemLines = items
      .map(i => `• ${i.name} x${i.qty} — ₦${(i.price * i.qty).toLocaleString()}`)
      .join('\n');

    const message =
      `🍽️ *New Order — ChopWithMel*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Delivery address:* ${address}\n\n` +
      `*Order:*\n${itemLines}\n\n` +
      `*Total paid:* ₦${Number(total).toLocaleString()}\n` +
      `*Paystack ref:* ${reference}\n` +
      `✅ Payment confirmed`;

    const whatsappNumber = process.env.WHATSAPP_NUMBER.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return res.json({ success: true, whatsappUrl });

  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    return res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
});

// Paystack webhook — notifies Mel on WhatsApp for every confirmed payment
app.post('/api/webhook', async (req, res) => {
  const hash = require('crypto')
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).send('Unauthorized');
  }

  const event = req.body;

  if (event.event === 'charge.success') {
    const data = event.data;
    const meta = data.metadata || {};
    const fields = (meta.custom_fields || []).reduce((acc, f) => {
      acc[f.variable_name] = f.value;
      return acc;
    }, {});

    const name    = fields.name    || 'Customer';
    const phone   = fields.phone   || 'N/A';
    const address = fields.address || 'N/A';
    const amount  = `₦${(data.amount / 100).toLocaleString()}`;
    const ref     = data.reference;
    const email   = data.customer?.email || 'N/A';

    const message =
      `🔔 *Payment Received — ChopWithMel*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Address:* ${address}\n\n` +
      `*Amount paid:* ${amount}\n` +
      `*Reference:* ${ref}\n` +
      `*Channel:* ${data.channel}\n\n` +
      `✅ Payment confirmed by Paystack`;

    const whatsappNumber = (process.env.WHATSAPP_NUMBER || '').replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    console.log(`✅ Webhook: payment confirmed — ${ref} — ${amount}`);
    console.log(`WhatsApp notify URL: ${whatsappUrl}`);
  }

  res.sendStatus(200);
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ChopWithMel server running on http://localhost:${PORT}`);
});
