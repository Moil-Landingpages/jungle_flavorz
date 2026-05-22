import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local (see .env.example)."
    );
  }
  if (!_stripe) {
    // Cast keeps us flexible across Stripe SDK minor releases.
    _stripe = new Stripe(key, { apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion });
  }
  return _stripe;
}
