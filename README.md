# ChopWithMel — Landing Page

Homemade African food brand landing page with Paystack payment integration and WhatsApp order routing.

## What this does

1. Customer visits the page and browses the menu
2. Adds dishes to their cart
3. Fills in name, phone, email, and delivery address
4. Pays via Paystack inline popup (card, bank transfer, USSD)
5. Backend verifies the payment with Paystack's API
6. Customer is sent to WhatsApp with a pre-filled order summary

---

## Project structure

```
chopwithmel/
├── server.js           # Express backend (Paystack verification + webhook)
├── package.json
├── .env.example        # Copy to .env and fill in your keys
└── public/
    ├── index.html      # Landing page
    ├── style.css       # Styles
    └── script.js       # Menu, cart logic, Paystack popup
```

---

## Local setup

### 1. Clone / download

If using GitHub, push this folder to a new repo:

```bash
git init
git add .
git commit -m "Initial ChopWithMel site"
git remote add origin https://github.com/YOUR_USERNAME/chopwithmel.git
git push -u origin main
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

| Variable | Where to get it |
|---|---|
| `PAYSTACK_PUBLIC_KEY` | [Paystack Dashboard → Settings → API Keys](https://dashboard.paystack.com/#/settings/developer) |
| `PAYSTACK_SECRET_KEY` | Same page — keep this secret, never commit it |
| `WHATSAPP_NUMBER` | Your WhatsApp number in international format, e.g. `2348012345678` |

### 4. Update your menu

Open `public/script.js` and edit the `MENU` array at the top. Each item needs:
- `id` — unique number
- `name` — dish name
- `description` — one-line description
- `price` — price in Naira (numbers only, e.g. `5500`)
- `emoji` — a food emoji for the card

### 5. Add your Paystack public key to the frontend

In `public/script.js`, replace:
```js
const PAYSTACK_PUBLIC_KEY = window.PAYSTACK_PUBLIC_KEY || 'pk_test_xxx';
```
with your actual test or live public key. The public key is safe to include in frontend code.

### 6. Run locally

```bash
npm run dev
```

Visit http://localhost:3000

---

## Deploy to Render (free)

### Step 1 — Push to GitHub

Make sure your code is in a GitHub repo (see step 1 above). Do NOT commit your `.env` file — it's in `.gitignore`.

### Step 2 — Create a Render Web Service

1. Go to [render.com](https://render.com) and sign up (free)
2. Click **New → Web Service**
3. Connect your GitHub account and select the `chopwithmel` repo
4. Configure the service:
   - **Environment:** Node
   - **Build command:** `npm install`
   - **Start command:** `node server.js`
   - **Instance type:** Free

### Step 3 — Add environment variables on Render

In your Render service dashboard, go to **Environment → Add Environment Variables**:

| Key | Value |
|---|---|
| `PAYSTACK_PUBLIC_KEY` | Your Paystack public key |
| `PAYSTACK_SECRET_KEY` | Your Paystack secret key |
| `WHATSAPP_NUMBER` | e.g. `2348012345678` |

### Step 4 — Deploy

Click **Deploy**. Render will build and deploy your site. You'll get a URL like `https://chopwithmel.onrender.com`.

### Step 5 — Set up Paystack webhook (optional but recommended)

1. Go to [Paystack Dashboard → Settings → Webhooks](https://dashboard.paystack.com/#/settings/developer)
2. Add your webhook URL: `https://chopwithmel.onrender.com/api/webhook`
3. This lets Paystack notify your server of payments even if the customer closes their browser

---

## Going live (from test to production)

1. In your Paystack dashboard, activate your account and get your **live** keys
2. Replace `pk_test_...` with `pk_live_...` in `script.js`
3. Update the `PAYSTACK_SECRET_KEY` on Render to your live secret key
4. Paystack will now process real card payments

---

## Customisation checklist

- [ ] Update `MENU` array in `script.js` with your real dishes and prices
- [ ] Replace placeholder food emoji with real photos (update `menu-card-img` in HTML/CSS)
- [ ] Update footer WhatsApp number to your real number
- [ ] Replace logo text `ChopWithMel` in `index.html` with your actual logo image
- [ ] Update meta description in `index.html` for SEO

---

## Tech stack

- **Frontend:** Plain HTML, CSS, JavaScript + Paystack Inline JS
- **Backend:** Node.js + Express
- **Payments:** Paystack (Nigeria-native, supports cards, bank transfer, USSD)
- **Hosting:** Render
- **Order fulfillment:** WhatsApp redirect after payment
