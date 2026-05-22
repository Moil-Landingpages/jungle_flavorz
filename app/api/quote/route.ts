import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/email";
import { quoteAdminEmail, quoteClientEmail } from "@/lib/email-templates";

const QuoteSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().default(""),
  eventType: z.string().min(1).max(80),
  guestCount: z.string().min(1).max(20),
  date: z.string().max(40).optional().default(""),
  message: z.string().max(4000).optional().default(""),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = QuoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Persist the request so Chef Linda doesn't lose anything even if email fails.
  try {
    await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        eventType: data.eventType,
        guestCount: data.guestCount,
        eventDate: data.date,
        message: data.message,
      },
    });
  } catch (err) {
    // DB might not be migrated locally — log and continue.
    console.error("[quote] DB write failed:", err);
  }

  // If Resend isn't configured yet, accept the submission but warn.
  if (!process.env.RESEND_API_KEY) {
    console.warn(
      "[quote] RESEND_API_KEY missing — quote stored but email not sent."
    );
    return NextResponse.json({
      ok: true,
      warning:
        "Stored, but email is not configured yet. Set RESEND_API_KEY in .env.",
    });
  }

  const resend = getResend();

  const adminMsg = quoteAdminEmail({
    name: data.name,
    email: data.email,
    phone: data.phone,
    eventType: data.eventType,
    guestCount: data.guestCount,
    date: data.date,
    message: data.message,
  });

  const clientMsg = quoteClientEmail({
    name: data.name,
    eventType: data.eventType,
    guestCount: data.guestCount,
    date: data.date,
  });

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: data.email,
        subject: adminMsg.subject,
        html: adminMsg.html,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: clientMsg.subject,
        html: clientMsg.html,
      }),
    ]);
  } catch (err: any) {
    console.error("[quote] Resend send failed:", err);
    return NextResponse.json(
      { error: "Failed to send email", detail: err?.message },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
