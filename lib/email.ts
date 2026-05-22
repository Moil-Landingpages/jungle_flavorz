import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

// Lazy-init so missing-key envs don't crash the build.
export function getResend(): Resend {
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to .env.local (see .env.example)."
    );
  }
  return new Resend(apiKey);
}

export const FROM_EMAIL = (
  process.env.RESEND_FROM_EMAIL || "Jungle Flavorz <partners@moilapp.com>"
).trim();
export const ADMIN_EMAIL = (
  process.env.ADMIN_EMAIL || "linda@jungleflavorz.com"
).trim();
