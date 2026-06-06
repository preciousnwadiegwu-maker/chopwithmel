require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// Paystack webhook (for server-side order logging — optional but recommended)
app.post('/api/webhook', (req, res) => {
  const hash = require('crypto')
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).send('Unauthorized');
  }

  const event = req.body;

  if (event.event === 'charge.success') {
    console.log('Payment confirmed via webhook:', event.data.reference);
    // TODO: save order to database here if needed
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
