import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PayClient } from "./PayClient";

export const dynamic = "force-dynamic";

export default async function PayPage({
  params,
  searchParams,
}: {
  params: { token: string };
  searchParams: { status?: string };
}) {
  const invoice = await prisma.invoice.findUnique({
    where: { publicToken: params.token },
  });
  if (!invoice) notFound();

  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: invoice.currency.toUpperCase(),
  }).format(invoice.amountCents / 100);

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream-white via-soft-beige/40 to-rich-gold/10 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-rich-gold/15 overflow-hidden">
        <div className="bg-gradient-to-br from-rich-gold to-caramel text-cream-white p-8 text-center">
          <div className="font-playfair text-3xl font-black">Jungle Flavorz</div>
          <div className="text-xs uppercase tracking-widest mt-1 opacity-90">
            Secure Invoice Payment
          </div>
        </div>
        <div className="p-8">
          <PayClient
            token={params.token}
            amount={amount}
            description={invoice.description}
            clientName={invoice.clientName}
            status={invoice.status as "SENT" | "PAID" | "CANCELED"}
            redirectStatus={searchParams.status}
          />
        </div>
      </div>
    </main>
  );
}
