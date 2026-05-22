import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { token } = await req.json().catch(() => ({}));
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const invoice = await prisma.invoice.findUnique({ where: { publicToken: token } });
  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }
  if (invoice.status === "PAID") {
    return NextResponse.json({ error: "Already paid" }, { status: 409 });
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: invoice.clientEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: invoice.currency,
            unit_amount: invoice.amountCents,
            product_data: {
              name: `Jungle Flavorz — ${invoice.description}`,
              description: `Invoice for ${invoice.clientName}`,
            },
          },
        },
      ],
      metadata: {
        invoiceId: invoice.id,
        invoiceToken: invoice.publicToken,
      },
      success_url: `${siteUrl}/pay/${invoice.publicToken}?status=success`,
      cancel_url: `${siteUrl}/pay/${invoice.publicToken}?status=cancel`,
    });

    await prisma.invoice.update({
      where: { id: invoice.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[pay] Stripe error:", err);
    return NextResponse.json(
      { error: "Stripe error", detail: err?.message },
      { status: 502 }
    );
  }
}
