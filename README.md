# Soko front end (Next.js 14, App Router)

Front end for the multi-vendor marketplace spec. All data comes from `lib/api.js`, a mock layer.

## Run
    npm install
    npm run dev      # http://localhost:3000

Demo logins: buyer@demo.com / seller@demo.com / agent@demo.com (password demo123); admin at /admin/login (admin@soko.app / admin123).

## Structure
- `app/` pages: landing, login, signup, shop, stores/[id], seller, agent, admin (+ admin/login)
- `lib/api.js` mock backend. Replace each function body with a real API call; keep the signatures.
- `lib/auth.jsx` session context and role guard (demo only)
- `components/` Nav, Pic (real photo or placeholder), StoreCard, LoginForm

## Built
Separate login and signup per role, separate staff login, location (36 states + FCT) and category filters, store pages with cover + gallery, seller photo uploads and product management, agent registration, admin approvals and order-charge settings.

## Not built yet (see the original spec)
Cart and checkout, orders and status tracking, in-site chat, payments and seller settlements, advertising purchase and placement, agent commission payouts, reviews, notifications, analytics, account deletion, maps.

## For the backend developer
- Auth: hashed passwords, server sessions or JWT, server-side role checks on every route (the Guard here is cosmetic).
- Images: upload to object storage (S3/Cloudinary) and store URLs; the demo uses temporary browser URLs.
- Payments: use a provider with marketplace/split payments and delayed settlement for hold-until-confirmed.
- Order charges and commissions must be calculated on the server and audit-logged.

## Added in round 2 (all mock, in `lib/market.js`)
Cart and checkout (service charge shown per who pays), buyer order tracking with confirm-receipt and rating, seller order management with paid-out vs held totals, buyer/seller chat (store page + inboxes), advertising packages with Sponsored placement in search, agent commission status, admin finance report, ad price editor and agent payout button.
Still not built: notifications, disputes/refunds, maps, account deletion, analytics charts, real-time chat. State resets on a full page reload.
