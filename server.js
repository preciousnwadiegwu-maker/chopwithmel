require('dotenv').config();
const express = require('express');
const axios   = require('axios');
const crypto  = require('crypto');
const path    = require('path');
const fs      = require('fs');

const app = express();

// ── STARTUP ENV VALIDATION ────────────────────────────────────────────────────
const REQUIRED_ENV = ['PAYSTACK_SECRET_KEY', 'PAYSTACK_PUBLIC_KEY', 'WHATSAPP_NUMBER', 'ADMIN_TOKEN'];
const missing = REQUIRED_ENV.filter(k => !process.env[k]);
if (missing.length) {
  console.warn(`⚠️  Missing env vars: ${missing.join(', ')} — features may be degraded.`);
}
const WA_NUMBER = (process.env.WHATSAPP_NUMBER || '').replace(/\D/g, '');

// ── SECURITY HEADERS (C7) ─────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// ── CORS (H6) — only allow our own domains ────────────────────────────────────
const ALLOWED_ORIGINS = new Set([
  'https://chopwithmel.com',
  'https://www.chopwithmel.com',
  'https://chopwithmel.onrender.com'
]);
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ── WEBHOOK: RAW BODY (C6) — must come BEFORE express.json() ──────────────────
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['x-paystack-signature'];
  if (!sig || !process.env.PAYSTACK_SECRET_KEY) return res.sendStatus(401);

  const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(req.body) // Buffer — exact bytes Paystack signed
    .digest('hex');

  const sigBuf = Buffer.from(sig);
  const hashBuf = Buffer.from(hash);
  if (sigBuf.length !== hashBuf.length || !crypto.timingSafeEqual(sigBuf, hashBuf)) {
    return res.sendStatus(401);
  }

  let event;
  try { event = JSON.parse(req.body.toString('utf8')); }
  catch { return res.sendStatus(400); }

  if (event.event === 'charge.success') {
    const data   = event.data;
    const meta   = data.metadata || {};
    const fields = (meta.custom_fields || []).reduce((acc, f) => { acc[f.variable_name] = f.value; return acc; }, {});

    const order = {
      id:        data.reference,
      ref:       data.reference,
      name:      String(fields.name || 'Customer').slice(0, 100),
      phone:     String(fields.phone || 'N/A').slice(0, 30),
      email:     String(data.customer?.email || 'N/A').slice(0, 200),
      address:   String(fields.address || 'N/A').slice(0, 500),
      items:     [],
      total:     data.amount / 100,
      channel:   data.channel,
      status:    'paid',
      createdAt: new Date().toISOString(),
      source:    'webhook'
    };

    const existing = loadOrders().find(o => o.ref === data.reference);
    if (!existing) saveOrder(order);

    console.log(`✅ Webhook: ${order.name} — ₦${order.total.toLocaleString()} — ${data.reference}`);
  }

  res.sendStatus(200);
});

// JSON parser for everything ELSE (after webhook to preserve raw body for HMAC)
app.use(express.json({ limit: '100kb' }));

// ── ORDERS LOG FILE + WRITE QUEUE (C2) ────────────────────────────────────────
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]');

function loadOrders() {
  try { return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')); }
  catch { return []; }
}

// Serialise all writes via a promise chain to prevent races
let writeQueue = Promise.resolve();
function withWriteLock(fn) {
  const next = writeQueue.then(fn).catch(err => console.error('Write lock error:', err));
  writeQueue = next.catch(() => {}); // never let queue reject
  return next;
}
function saveOrder(order) {
  return withWriteLock(() => {
    const orders = loadOrders();
    orders.unshift(order);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  });
}

// ── AD ATTRIBUTION SANITIZER — whitelist utm fields from client ───────────────
function cleanAttribution(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const out = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'landing'].forEach(k => {
    if (raw[k]) out[k] = String(raw[k]).slice(0, 100);
  });
  return Object.keys(out).length ? out : null;
}

// ── ADMIN AUTH — TIMING SAFE (C4) ─────────────────────────────────────────────
function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  if (!ADMIN_TOKEN) return res.status(500).json({ error: 'Admin token not configured' });
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const tokBuf   = Buffer.from(String(token));
  const adminBuf = Buffer.from(ADMIN_TOKEN);
  if (tokBuf.length !== adminBuf.length || !crypto.timingSafeEqual(tokBuf, adminBuf)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ── BLOCK DIRECT ACCESS TO ADMIN.HTML (C4 hardening) ──────────────────────────
app.use((req, res, next) => {
  const p = req.path.toLowerCase();
  if (p === '/admin.html' || p.startsWith('/data/')) {
    return res.status(404).send('Not Found');
  }
  next();
});

// ── STATIC FILES ─────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    // HTML, JS, CSS — revalidate every load so menu/UX updates ship instantly
    if (/\.(html|js|css)$/.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    } else if (/\.(jpg|jpeg|png|webp|gif|svg|mp4|webm|woff2?)$/.test(filePath)) {
      // Images/videos/fonts — long cache, filename change busts it
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

// ── PAYSTACK PUBLIC KEY + AD TRACKING IDS ─────────────────────────────────────
app.get('/config.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'no-store');
  res.send(
    `window.PAYSTACK_PUBLIC_KEY = ${JSON.stringify(process.env.PAYSTACK_PUBLIC_KEY || '')};\n` +
    `window.META_PIXEL_ID = ${JSON.stringify(process.env.META_PIXEL_ID || '')};\n` +
    `window.GA_MEASUREMENT_ID = ${JSON.stringify(process.env.GA_MEASUREMENT_ID || '')};`
  );
});

// ── VERIFY PAYMENT ────────────────────────────────────────────────────────────
app.post('/api/verify-payment', async (req, res) => {
  const { reference, orderDetails } = req.body || {};

  // Input validation (C5)
  if (!reference || typeof reference !== 'string' || reference.length > 100) {
    return res.status(400).json({ success: false, message: 'Invalid reference' });
  }
  if (!orderDetails || typeof orderDetails !== 'object') {
    return res.status(400).json({ success: false, message: 'Missing order details' });
  }
  const name    = String(orderDetails.name    || '').trim().slice(0, 100);
  const phone   = String(orderDetails.phone   || '').trim().slice(0, 30);
  const address = String(orderDetails.address || '').trim().slice(0, 500);
  const email   = String(orderDetails.email   || '').trim().slice(0, 200);
  const items   = Array.isArray(orderDetails.items) ? orderDetails.items.slice(0, 50) : [];
  const claimedTotal = Number(orderDetails.total) || 0;

  if (!name || !phone || !address || items.length === 0 || claimedTotal <= 0) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const paystackRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }, timeout: 15000 }
    );

    const transaction = paystackRes.data.data;
    if (transaction.status !== 'success') {
      return res.json({ success: false, message: 'Payment was not successful' });
    }

    // CRITICAL: verify Paystack amount matches what client claimed (C5)
    const verifiedTotal = transaction.amount / 100;
    if (Math.abs(verifiedTotal - claimedTotal) > 1) {
      console.warn(`⚠️ Amount mismatch on ${reference}: claimed=${claimedTotal} verified=${verifiedTotal}`);
      return res.status(400).json({ success: false, message: 'Amount mismatch — please contact support' });
    }

    // Save order
    await saveOrder({
      id: reference, ref: reference,
      name, phone, address, email,
      items, total: verifiedTotal,
      channel: transaction.channel || 'unknown',
      status: 'paid',
      createdAt: new Date().toISOString(),
      attribution: cleanAttribution(orderDetails.attribution)
    });

    // Build WhatsApp URL — guard WA_NUMBER (C1)
    let whatsappUrl = null;
    if (WA_NUMBER) {
      const itemLines = items
        .map(i => `• ${String(i.name||'').slice(0,80)} x${Number(i.qty)||1} — ₦${((Number(i.price)||0) * (Number(i.qty)||1)).toLocaleString()}`)
        .join('\n');
      const message =
        `🍽️ *New Order — ChopWithMel*\n\n` +
        `*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'N/A'}\n*Delivery:* ${address}\n\n` +
        `*Order:*\n${itemLines}\n\n` +
        `*Total paid:* ₦${verifiedTotal.toLocaleString()}\n*Ref:* ${reference}\n✅ Payment confirmed`;
      whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    return res.json({ success: true, whatsappUrl });
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    return res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
});

// ── WHATSAPP-FIRST ORDER (Test #1 — bypass Paystack, save as pending) ────────
app.post('/api/whatsapp-order', async (req, res) => {
  const b = req.body || {};
  const ref = String(b.ref || '').trim().slice(0, 100);
  const name = String(b.name || '').trim().slice(0, 100);
  const phone = String(b.phone || '').trim().slice(0, 30);
  const email = String(b.email || '').trim().slice(0, 200);
  const address = String(b.address || '').trim().slice(0, 500);
  const items = Array.isArray(b.items) ? b.items.slice(0, 50) : [];
  const total = Number(b.total) || 0;

  if (!ref || !name || !phone || !address || items.length === 0 || total <= 0) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    await saveOrder({
      id: ref, ref,
      name, phone, address, email,
      items, total,
      channel: 'whatsapp',
      status: 'pending',
      createdAt: new Date().toISOString(),
      source: 'whatsapp_intent',
      attribution: cleanAttribution(b.attribution)
    });
    console.log(`📲 WhatsApp intent: ${name} — ₦${total.toLocaleString()} — ${ref}`);
    return res.json({ success: true });
  } catch (err) {
    console.error('WhatsApp order save error:', err);
    return res.status(500).json({ success: false });
  }
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
      total: orders.length,
      revenue: total,
      todayCount: todayOrders.length,
      todayRevenue: todayTotal
    }
  });
});

// ── ADMIN API: UPDATE ORDER STATUS (H10 — whitelist) ──────────────────────────
const ALLOWED_STATUS = new Set(['paid', 'preparing', 'out_for_delivery', 'delivered', 'cancelled', 'pending']);
app.patch('/admin/api/orders/:ref', adminAuth, async (req, res) => {
  const { status } = req.body || {};
  if (!ALLOWED_STATUS.has(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  let result = null;
  try {
    await withWriteLock(() => {
      const orders = loadOrders();
      const idx = orders.findIndex(o => o.ref === req.params.ref);
      if (idx === -1) { result = { _err: 404 }; return; }
      orders[idx] = { ...orders[idx], status, updatedAt: new Date().toISOString() };
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
      result = orders[idx];
    });
  } catch (e) { return res.status(500).json({ error: 'Update failed' }); }
  if (result && result._err === 404) return res.status(404).json({ error: 'Order not found' });
  res.json(result);
});

// ── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
app.get('/admin', adminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ── FAQ ROUTE (H5) ────────────────────────────────────────────────────────────
app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'faq.html'));
});

// ── REFERRAL LANDING ──────────────────────────────────────────────────────────
app.get('/refer', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'refer.html'));
});

// ── OMUGWO / POSTPARTUM PACKAGE LANDING ───────────────────────────────────────
app.get('/omugwo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'omugwo.html'));
});

// ── CATCH-ALL ─────────────────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ChopWithMel running on http://localhost:${PORT}`));
