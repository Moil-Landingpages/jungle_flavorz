"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function PayClient({
  token,
  amount,
  description,
  clientName,
  status,
  redirectStatus,
}: {
  token: string;
  amount: string;
  description: string;
  clientName: string;
  status: "SENT" | "PAID" | "CANCELED";
  redirectStatus?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paid = status === "PAID" || redirectStatus === "success";

  const handlePay = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout");
      }
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (paid) {
    return (
      <div className="text-center">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="font-playfair text-2xl font-bold text-warm-brown">
          Payment received
        </h1>
        <p className="text-warm-brown/70 mt-2">
          Thank you, {clientName}! Chef Linda has been notified.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-warm-brown/60">Billed to</p>
      <p className="font-semibold text-warm-brown">{clientName}</p>

      <div className="mt-5 p-4 rounded-xl bg-soft-beige/40 border border-rich-gold/10">
        <p className="text-sm text-warm-brown/70">{description}</p>
        <p className="font-playfair text-4xl font-black text-warm-brown mt-2">
          {amount}
        </p>
      </div>

      {redirectStatus === "cancel" && (
        <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-amber-50 text-amber-900 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          Payment canceled. You can try again below.
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={loading}
        className="mt-6 w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gradient-to-r from-rich-gold to-caramel text-cream-white font-semibold shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Redirecting to secure checkout…
          </>
        ) : (
          "Pay Securely with Stripe"
        )}
      </button>

      <p className="text-xs text-warm-brown/55 text-center mt-3">
        Powered by Stripe. Your card details never touch our servers.
      </p>
    </div>
  );
}
