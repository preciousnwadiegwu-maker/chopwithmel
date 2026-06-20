# ChopWithMel — Build Kickoff Prompt

> Paste this into your coding agent (Claude Code, Cursor, etc.) to scaffold the real product. It's written from the validated prototype: a Meta-ad → spin-the-wheel → WhatsApp → order → loyalty/referral funnel for a Lagos food business. Adjust stack choices in the marked section if you have preferences.

---

You are building **ChopWithMel**, a gamified mobile-first food-ordering web app for a Lagos, Nigeria kitchen business. The growth model is a full funnel: a Meta (Facebook/Instagram) paid ad drives cold traffic to a **spin-the-wheel** landing page that captures a WhatsApp number and triggers a first order, then a **streak + points + referral** loyalty loop drives repeat orders. Naira (₦) only. Mobile-first, low-data, WhatsApp-native.

## Goals (in priority order)
1. A working ordering flow a real customer can complete on a phone, paying with Paystack.
2. The spin-the-wheel acquisition mechanic with WhatsApp capture and prize-coupon issuance.
3. The loyalty loop: time-boxed streaks, points/tiers, and a double-sided "give ₦1,000 / get ₦1,000" referral.
4. An admin/owner view to manage menu, see orders, and read funnel metrics (CAC, opt-in rate, first-order conversion, repeat rate).

## Tech stack (change if you prefer)
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind. Mobile-first, minimal bundle (Lagos data costs matter — lazy-load, no heavy libs).
- **Backend/DB:** Next.js API routes (or a thin Node/Express layer) + Postgres via Prisma. Supabase is fine.
- **Payments:** Paystack (NGN). Fee model: 1.5% + ₦100, ₦100 waived under ₦2,500, capped at ₦2,000 — surface fees in order math.
- **Messaging:** WhatsApp Cloud API (Meta) for prize codes, order confirmations, streak nudges, and referral shares. Build it behind a `MessagingProvider` interface so it can be stubbed in dev.
- **Auth:** phone-number (WhatsApp) based, OTP-light. No passwords.
- **Analytics:** event log table + a simple funnel dashboard (no third-party needed for v1).

## Data model (start here)
- `Customer` — id, whatsapp, name, tier (BRONZE/SILVER/GOLD), points, referralCode, referredById, createdAt.
- `MenuItem` — id, name, priceNgn, category, imageUrl, active.
- `Order` — id, customerId, items[], subtotalNgn, discountNgn, deliveryNgn, totalNgn, paystackRef, status, prizeCouponId, createdAt.
- `Coupon` — id, customerId, type (PERCENT/FIXED/FREE_DELIVERY/FREE_ITEM), value, source (SPIN/REFERRAL/STREAK), redeemed, expiresAt.
- `SpinEvent` — id, sessionId, customerId?, prize, capturedWhatsapp, createdAt (for opt-in analytics).
- `Referral` — id, referrerId, refereeId, status (PENDING/COMPLETED), rewardIssued.
- `StreakProgress` — customerId, windowStart, ordersInWindow, target (default 3), windowDays (default 14), rewardClaimed.
- `Event` — generic funnel event log: type, sessionId, customerId?, meta json, ts. (ad_click, spin, optin, first_order, repeat_order, referral_sent, referral_completed.)

## Funnel mechanics to implement
**1. Spin-the-wheel landing (`/spin`)**
- 8-segment wheel, every spin "wins" (weighted odds, configurable, margin-protected). Prizes: 5/10/15/40% off, free delivery, free drink, free side.
- One spin per session/number. After spin, capture WhatsApp number (single field) → issue a `Coupon` with ~72h expiry → send code via WhatsApp → deep-link to `/order` with coupon pre-applied.
- Log `spin` and `optin` events. Mirror the ad's creative/offer on the page (message match).

**2. Order flow (`/order`)**
- Menu, cart, coupon auto-applied, free delivery on first order. Show live total with Paystack fee logic.
- Checkout → Paystack inline → on success create `Order`, mark coupon redeemed, send WhatsApp confirmation, enroll in loyalty.

**3. Loyalty loop (`/account`)**
- **Streak:** "order 3× in 14 days → free dessert + 2× points." Progress bar; expire/reset logic; WhatsApp nudge when 1 order left and <72h remain.
- **Points/tiers:** earn points per ₦ spent; 400 pts = ₦2,000 off; Bronze→Silver→Gold thresholds.
- **Referral:** unique code; referee gets ₦1,000 off first order, referrer gets ₦1,000 credit *after* referee's first paid order completes. "Share on WhatsApp" prefilled message.

**4. Owner dashboard (`/admin`)**
- Menu CRUD, live orders, and a funnel panel: landing visits, spin opt-in %, opt-in→first-order %, blended CAC (ad spend / new customers), repeat rate, churn, LTV:CAC. Let owner input monthly Meta ad spend to compute CAC.

## Reference economics (bake into dashboard math, keep editable)
AOV ₦10,000 · contribution ₦4,750/order (47.5%) · 4 orders/customer/month · target CAC < ₦3,000 (vs ₦6,000 baseline) · target churn 15% (from 20%). Spin prize is an acquisition cost deducted from first-order contribution only.

## Build order
1. Scaffold app, DB schema, seed menu. 2. Order flow + Paystack (test mode). 3. Spin-the-wheel + WhatsApp capture + coupon issuance. 4. Loyalty (streak, points, referral). 5. Owner dashboard + event analytics. 6. WhatsApp Cloud API wiring.

## Constraints & non-negotiables
- Mobile-first, fast, low-data. Test on a throttled 3G profile.
- All money in integer kobo/naira; never float. Show Paystack fees transparently.
- Secrets in env vars (Paystack keys, WhatsApp token). Never commit them. Stub providers in dev.
- Idempotent payment webhook handling. Verify Paystack signatures.
- Accessibility: tap targets ≥44px, sufficient contrast.

## First deliverable
Set up the repo, Prisma schema above, a seeded menu, and a working `/order` → Paystack (test mode) → confirmation flow. Show me the schema and the order flow before moving to the spin mechanic. Ask me for: Paystack test keys, the real menu + prices, brand colors (default: orange #ff5a1f / amber #ffb020), and whether to use Supabase or plain Postgres.
