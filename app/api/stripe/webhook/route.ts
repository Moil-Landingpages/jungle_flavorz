import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/email";

// Stripe webhooks need the raw body — opt out of Next's body parsing.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !whSecret) {
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  const raw = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(raw, sig, whSecret);
  } catch (err: any) {
    console.error("[webhook] signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoiceId = session.metadata?.invoiceId;
    if (!invoiceId) {
      return NextResponse.json({ ok: true, ignored: "no invoiceId" });
    }

    const invoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: "PAID", paidAt: new Date() },
    });

    // Notify admin that payment was received.
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = getResend();
        const amount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: invoice.currency.toUpperCase(),
        }).format(invoice.amountCents / 100);

        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `💰 Payment received — ${amount} from ${invoice.clientName}`,
          html: `
            <div style="font-family:sans-serif;color:#2b1b0f">
              <h2>Payment received</h2>
              <p>${invoice.clientName} (${invoice.clientEmail}) just paid <strong>${amount}</strong>.</p>
              <p><strong>Description:</strong> ${invoice.description}</p>
              <p><strong>Invoice ID:</strong> ${invoice.id}</p>
              <p><strong>Stripe session:</strong> ${session.id}</p>
            </div>
          `,
        });
      } catch (err) {
        console.error("[webhook] notification email failed:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
