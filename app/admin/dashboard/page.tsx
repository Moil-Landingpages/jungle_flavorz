import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readAdminSession } from "@/lib/auth";
import { DashboardClient } from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await readAdminSession();
  if (!session) redirect("/admin/login");

  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <DashboardClient
      adminEmail={session.email as string}
      initialInvoices={invoices.map((i) => ({
        id: i.id,
        publicToken: i.publicToken,
        clientName: i.clientName,
        clientEmail: i.clientEmail,
        description: i.description,
        amountCents: i.amountCents,
        currency: i.currency,
        status: i.status as "SENT" | "PAID" | "CANCELED",
        createdAt: i.createdAt.toISOString(),
        updatedAt: i.updatedAt.toISOString(),
        paidAt: i.paidAt ? i.paidAt.toISOString() : null,
      }))}
      quotes={quotes.map((q) => ({
        ...q,
        createdAt: q.createdAt.toISOString(),
      }))}
    />
  );
}
