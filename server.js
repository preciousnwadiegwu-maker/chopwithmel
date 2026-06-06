require('dotenv').config();
const express = require('express');
const axios   = require('axios');
const crypto  = require('crypto');
const path    = require('path');
const fs      = require('fs');

const app = express();
app.use(express.json());

// ── ORDERS LOG FILE ──────────────────────────────────────────────────────────
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]');

function loadOrders() {
  try { return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')); }
  catch { return []; }
}

function saveOrder(order) {
  const orders = loadOrders();
  orders.unshift(order); // newest first
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

// ── ADMIN MIDDLEWARE (simple token auth) ─────────────────────────────────────
function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'chopwithmel-admin-2024';
  if (token !== ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ── STATIC FILES ─────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── PAYSTACK PUBLIC KEY ───────────────────────────────────────────────────────
app.get('/config.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`window.PAYSTACK_PUBLIC_KEY = ${JSON.stringify(process.env.PAYSTACK_PUBLIC_KEY || '')};`);
});

// ── VERIFY PAYMENT ────────────────────────────────────────────────────────────
app.post('/api/verify-payment', async (req, res) => {
  const { reference, orderDetails } = req.body;
  if (!reference || !orderDetails) {
    return res.status(400).json({ success: false, message: 'Missing reference or order details' });
  }

  try {
    const paystackRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    const transaction = paystackRes.data.data;
    if (transaction.status !== 'success') {
      return res.json({ success: false, message: 'Payment was not successful' });
    }

    const { name, phone, address, items, total } = orderDetails;

    // Save order to file
    saveOrder({
      id: reference,
      ref: reference,
      name, phone, address,
      email: orderDetails.email || '',
      items,
      total,
      channel: transaction.channel || 'unknown',
      status: 'paid',
      createdAt: new Date().toISOString()
    });

    const itemLines = items
      .map(i => `• ${i.name} x${i.qty} — ₦${(i.price * i.qty).toLocaleString()}`)
      .join('\n');

    const message =
      `🍽️ *New Order — ChopWithMel*\n\n` +
      `*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${orderDetails.email || 'N/A'}\n*Delivery:* ${address}\n\n` +
      `*Order:*\n${itemLines}\n\n` +
      `*Total paid:* ₦${Number(total).toLocaleString()}\n*Ref:* ${reference}\n✅ Payment confirmed`;

    const whatsappNumber = process.env.WHATSAPP_NUMBER.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return res.json({ success: true, whatsappUrl });
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    return res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
});

// ── PAYSTACK WEBHOOK ──────────────────────────────────────────────────────────
app.post('/api/webhook', async (req, res) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) return res.status(401).send('Unauthorized');

  const event = req.body;
  if (event.event === 'charge.success') {
    const data   = event.data;
    const meta   = data.metadata || {};
    const fields = (meta.custom_fields || []).reduce((acc, f) => { acc[f.variable_name] = f.value; return acc; }, {});

    const order = {
      id:        data.reference,
      ref:       data.reference,
      name:      fields.name    || 'Customer',
      phone:     fields.phone   || 'N/A',
      email:     data.customer?.email || 'N/A',
      address:   fields.address || 'N/A',
      items:     [],
      total:     data.amount / 100,
      channel:   data.channel,
      status:    'paid',
      createdAt: new Date().toISOString(),
      source:    'webhook'
    };

    // Only save if not already saved by verify-payment
    const existing = loadOrders().find(o => o.ref === data.reference);
    if (!existing) saveOrder(order);

    const amount = `₦${order.total.toLocaleString()}`;
    console.log(`✅ Webhook: ${order.name} — ${amount} — ${data.reference}`);
  }

  res.sendStatus(200);
});

// ── ADMIN API: GET ORDERS ─────────────────────────────────────────────────────
app.get('/admin/api/orders', adminAuth, (req, res) => {
  const orders = loadOrders();
  const total  = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const today  = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
  const todayTotal  = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  res.json({
    orders,
    stats: {
      total:      orders.length,
      revenue:    total,
      todayCount: todayOrders.length,
      todayRevenue: todayTotal
    }
  });
});

// ── ADMIN API: UPDATE ORDER STATUS ────────────────────────────────────────────
app.patch('/admin/api/orders/:ref', adminAuth, (req, res) => {
  const orders = loadOrders();
  const idx = orders.findIndex(o => o.ref === req.params.ref);
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  orders[idx] = { ...orders[idx], ...req.body, updatedAt: new Date().toISOString() };
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  res.json(orders[idx]);
});

// ── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
app.get('/admin', adminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ── CATCH-ALL ─────────────────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ChopWithMel running on http://localhost:${PORT}`));
