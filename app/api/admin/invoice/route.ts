import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { readAdminSession } from "@/lib/auth";
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/email";
import { invoiceClientEmail } from "@/lib/email-templates";

const InvoiceSchema = z.object({
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  description: z.string().min(1),
  amount: z.number().positive(), // dollars
  currency: z.string().default("usd"),
});

export async function GET() {
  const session = await readAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ invoices });
}

export async function POST(req: Request) {
  const session = await readAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = InvoiceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { clientName, clientEmail, description, amount, currency } = parsed.data;
  const amountCents = Math.round(amount * 100);
  const publicToken = randomBytes(18).toString("base64url");

  const invoice = await prisma.invoice.create({
    data: {
      publicToken,
      clientName,
      clientEmail,
      description,
      amountCents,
      currency,
    },
  });

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";
  const payUrl = `${siteUrl}/pay/${publicToken}`;

  // Email the invoice + payment link to the client (and CC admin).
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = getResend();
      const msg = invoiceClientEmail({
        clientName,
        description,
        amountCents,
        currency,
        payUrl,
      });
      await resend.emails.send({
        from: FROM_EMAIL,
        to: clientEmail,
        cc: ADMIN_EMAIL,
        subject: msg.subject,
        html: msg.html,
      });
    } catch (err) {
      console.error("[invoice] email send failed:", err);
    }
  } else {
    console.warn("[invoice] RESEND_API_KEY missing — skipping email send.");
  }

  return NextResponse.json({ invoice, payUrl });
}

