"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, Copy, ExternalLink, CheckCircle2 } from "lucide-react";

type Invoice = {
  id: string;
  publicToken: string;
  clientName: string;
  clientEmail: string;
  description: string;
  amountCents: number;
  currency: string;
  status: "SENT" | "PAID" | "CANCELED";
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
};

type Quote = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  eventType: string;
  guestCount: string;
  eventDate: string | null;
  message: string | null;
  createdAt: string;
};

const money = (cents: number, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);

export function DashboardClient({
  adminEmail,
  initialInvoices,
  quotes,
}: {
  adminEmail: string;
  initialInvoices: Invoice[];
  quotes: Quote[];
}) {
  const router = useRouter();
  const [invoices, setInvoices] = useState(initialInvoices);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    description: "Catering services",
    amount: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      const res = await fetch("/api/admin/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: form.clientName,
          clientEmail: form.clientEmail,
          description: form.description,
          amount: Number(form.amount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create invoice");
      setInvoices([data.invoice, ...invoices]);
      setForm({
        clientName: "",
        clientEmail: "",
        description: "Catering services",
        amount: "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/pay/${token}`;
    navigator.clipboard.writeText(url);
    setCopied(token);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-cream-white">
      <header className="border-b border-warm-brown/10 bg-white">
        <div className="container py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rich-gold to-caramel flex items-center justify-center">
              <span className="font-playfair text-cream-white font-black">
                JF
              </span>
            </div>
            <div>
              <div className="font-playfair font-bold text-warm-brown">
                Admin Dashboard
              </div>
              <div className="text-xs text-warm-brown/60">{adminEmail}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm text-warm-brown/70 hover:text-bronze"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="container py-10 grid lg:grid-cols-3 gap-8">
        {/* Create invoice */}
        <section className="lg:col-span-1 bg-white border border-warm-brown/10 rounded-3xl p-6 shadow-sm h-fit">
          <h2 className="font-playfair text-xl font-bold text-warm-brown mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-rich-gold" />
            New Invoice
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <Field
              label="Client Name"
              value={form.clientName}
              onChange={(v) => setForm({ ...form, clientName: v })}
            />
            <Field
              label="Client Email"
              type="email"
              value={form.clientEmail}
              onChange={(v) => setForm({ ...form, clientEmail: v })}
            />
            <Field
              label="Description"
              value={form.description}
              onChange={(v) => setForm({ ...form, description: v })}
            />
            <Field
              label="Amount (USD)"
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(v) => setForm({ ...form, amount: v })}
            />

            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={creating}
              className="w-full py-2.5 rounded-full bg-warm-brown text-cream-white font-semibold hover:bg-bronze transition-colors disabled:opacity-60"
            >
              {creating ? "Creating & sending…" : "Create & Send Invoice"}
            </button>
            <p className="text-xs text-warm-brown/60">
              An invoice email with a Stripe payment link will be sent to the
              client automatically.
            </p>
          </form>
        </section>

        {/* Invoices list */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-warm-brown/10 rounded-3xl p-6 shadow-sm">
            <h2 className="font-playfair text-xl font-bold text-warm-brown mb-4">
              Invoices
            </h2>
            {invoices.length === 0 ? (
              <p className="text-sm text-warm-brown/60">No invoices yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-warm-brown/60 text-left">
                    <tr>
                      <th className="py-2 pr-3">Client</th>
                      <th className="py-2 pr-3">Description</th>
                      <th className="py-2 pr-3">Amount</th>
                      <th className="py-2 pr-3">Status</th>
                      <th className="py-2 pr-3">Pay link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-brown/10">
                    {invoices.map((inv) => (
                      <tr key={inv.id}>
                        <td className="py-3 pr-3">
                          <div className="font-medium text-warm-brown">
                            {inv.clientName}
                          </div>
                          <div className="text-xs text-warm-brown/55">
                            {inv.clientEmail}
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-warm-brown/80">
                          {inv.description}
                        </td>
                        <td className="py-3 pr-3 font-semibold text-warm-brown">
                          {money(inv.amountCents, inv.currency)}
                        </td>
                        <td className="py-3 pr-3">
                          <StatusBadge status={inv.status} />
                        </td>
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyLink(inv.publicToken)}
                              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-warm-brown/15 hover:bg-soft-beige/50"
                            >
                              {copied === inv.publicToken ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" /> Copy
                                </>
                              )}
                            </button>
                            <a
                              href={`/pay/${inv.publicToken}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-warm-brown/15 hover:bg-soft-beige/50"
                            >
                              <ExternalLink className="w-3 h-3" /> Open
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white border border-warm-brown/10 rounded-3xl p-6 shadow-sm">
            <h2 className="font-playfair text-xl font-bold text-warm-brown mb-4">
              Recent Quote Requests
            </h2>
            {quotes.length === 0 ? (
              <p className="text-sm text-warm-brown/60">No quote requests yet.</p>
            ) : (
              <ul className="divide-y divide-warm-brown/10">
                {quotes.map((q) => (
                  <li key={q.id} className="py-3">
                    <div className="flex justify-between gap-3 flex-wrap">
                      <div>
                        <div className="font-medium text-warm-brown">
                          {q.name}{" "}
                          <span className="text-xs text-warm-brown/55">
                            ({q.email}){q.phone ? ` • ${q.phone}` : ""}
                          </span>
                        </div>
                        <div className="text-sm text-warm-brown/70">
                          {q.eventType} • {q.guestCount} guests
                          {q.eventDate ? ` • ${q.eventDate}` : ""}
                        </div>
                        {q.message && (
                          <p className="text-sm text-warm-brown/60 mt-1">
                            {q.message}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-warm-brown/55">
                        {new Date(q.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: Invoice["status"] }) {
  const styles =
    status === "PAID"
      ? "bg-green-100 text-green-700"
      : status === "CANCELED"
      ? "bg-red-100 text-red-700"
      : "bg-amber-100 text-amber-800";
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-warm-brown/70">{label}</label>
      <input
        type={type}
        step={step}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2 rounded-lg border border-warm-brown/15 focus:border-rich-gold focus:outline-none text-sm"
      />
    </div>
  );
}
