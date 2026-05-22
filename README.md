# Jungle Flavorz

Authentic Burundian & East African catering — built on **Next.js 14 (App Router)** with **Tailwind**, **GSAP** scroll animations, **Resend** for quote emails, **Stripe** for invoice payments, and **Prisma** for persistence.

---

## Local setup

```bash
# 1. Install dependencies (also generates the Prisma client)
npm install

# 2. Create .env.local from the template
cp .env.example .env.local
# …then fill in the values (see "Environment variables" below).

# 3. Create the local SQLite DB
npx prisma db push

# 4. Run the dev server
npm run dev
```

Visit http://localhost:3000.

---

## Environment variables

All keys are documented in [`.env.example`](./.env.example). At a glance:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Base URL used in emails + Stripe redirect URLs |
| `RESEND_API_KEY` | API key from https://resend.com |
| `RESEND_FROM_EMAIL` | The verified "from" address (e.g. `quotes@jungleflavorz.com`) |
| `ADMIN_EMAIL` | Where quote requests and payment notifications are delivered |
| `STRIPE_SECRET_KEY` | Stripe secret key (use test keys until ready to go live) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret from the Stripe dashboard |
| `ADMIN_JWT_SECRET` | Random string used to sign admin session cookies |
| `ADMIN_EMAIL_LOGIN` | Email Chef Linda logs into `/admin/login` with |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of her password (see below) |
| `DATABASE_URL` | SQLite locally; Postgres in production |

### Generate the admin password hash

```bash
node scripts/hash-password.js "your-strong-password"
# Paste the printed hash into ADMIN_PASSWORD_HASH
```

### Generate `ADMIN_JWT_SECRET`

```bash
openssl rand -base64 32
```

---

## How the pieces fit together

### Quote form → Outlook inbox
- Visitor submits the form on the homepage.
- `POST /api/quote` validates input, saves to the database, and sends **two emails via Resend**:
  1. To `ADMIN_EMAIL` (Chef Linda's Outlook) with all the details.
  2. To the visitor confirming receipt.

### Admin invoicing → Stripe → email notification
1. Chef Linda signs in at `/admin/login`.
2. From `/admin/dashboard` she fills in client name / email / description / amount and clicks **Create & Send Invoice**.
3. The server creates an `Invoice` row and emails the client a branded invoice with a **Pay Securely** button linking to `/pay/<token>`.
4. When the client clicks the button, the server creates a **Stripe Checkout Session** and redirects them to Stripe's hosted payment page.
5. After successful payment, Stripe calls `POST /api/stripe/webhook`, which:
   - Marks the invoice `PAID` in the database.
   - Sends an email to `ADMIN_EMAIL` titled **"💰 Payment received"** with the amount, client, and Stripe session ID.

---

## Setting up Resend (so emails actually arrive in Outlook)

1. Sign up at [resend.com](https://resend.com).
2. Go to **Domains** → **Add Domain** → enter `jungleflavorz.com` (or your domain).
3. Resend will give you 3 DNS records (DKIM, SPF, return-path). Add them in your domain registrar's DNS settings. This is **critical** — without it, emails will land in spam.
4. Wait for verification (usually under 10 minutes).
5. Create an API key under **API Keys** with **Sending access**.
6. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` (must use the verified domain).

> Until the domain is verified you can test with `RESEND_FROM_EMAIL="onboarding@resend.dev"` (Resend's sandbox), but it only delivers to the email you signed up with.

---

## Setting up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com). Stay in **Test mode** during setup.
2. Get your `Secret key` from **Developers → API Keys** → set as `STRIPE_SECRET_KEY`.
3. Deploy the site (see below), then in Stripe go to **Developers → Webhooks → Add endpoint**:
   - URL: `https://<your-domain>/api/stripe/webhook`
   - Events: `checkout.session.completed`
4. Copy the webhook **Signing secret** → set as `STRIPE_WEBHOOK_SECRET`.
5. When ready to take real money, switch the toggle to **Live** and replace both keys.

---

## Deploying to Vercel (recommended)

```bash
npm i -g vercel
vercel
```

1. Push the repo to GitHub.
2. In Vercel, import the project.
3. In **Project Settings → Environment Variables**, add **every** variable from `.env.example` with real values. For `DATABASE_URL`, attach **Vercel Postgres** (Storage tab → Create → Postgres) — it auto-populates the variable.
4. Update `prisma/schema.prisma` to use Postgres before pushing to prod:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
   Then run `npx prisma db push` against the production URL once.
5. Add `https://<your-vercel-url>/api/stripe/webhook` to Stripe's webhook endpoints.
6. Point your domain at Vercel and update `NEXT_PUBLIC_SITE_URL` to the public URL.

That's it — the site is live and quote emails will start landing in Outlook.

---

## Image-to-dish mapping

All food images live in `public/menu/` and are mapped to dishes in [`data/menu.ts`](./data/menu.ts). When a new photo is added, just drop it into `public/menu/` and reference it by filename in the matching item's `images` array. The properly-named photos are now the primary image for each dish:

| Dish | Primary image |
| --- | --- |
| Beef Sambussa | `Beef Sambussa.jpeg` |
| Chapati | `Chapati.jpeg` |
| Sweet Plantains | `Sweet Plantains.jpeg` |
| Beignets | `Beignets pic.jpeg` |
| Sweet Mandazi | `Sweet Mandazi.jpeg` |
| Jollof Rice | `Jollof Rice.jpeg` |
| Pilau | `Pilau.jpeg` |
| Fried Rice | `Fried Rice.jpeg` |
| Jungle Chicken | `Jungle Chicken.jpeg` |
| Marinated Jungle Beef | `Marinated Jungle Beef.jpeg` |
| Beef Kabob | `Beef Kabob.jpeg` |
| Chicken Kabob | `Chicken Kabob.jpeg` |
| Fumbwa | `Fumbwa.jpeg` |
| Pinto Beans | `Beans.jpeg` |
| Cabbage Crunch Salad | `Cabbage Crunch Salad.jpeg` |
| Mixed Green Salad | `Mixed Green Salad.jpeg` |

---

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Lint
```
