"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream-white via-soft-beige/40 to-rich-gold/10 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full bg-white rounded-3xl shadow-xl border border-rich-gold/15 p-8 space-y-5"
      >
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-rich-gold to-caramel flex items-center justify-center mb-3">
            <span className="font-playfair text-cream-white text-xl font-black">
              JF
            </span>
          </div>
          <h1 className="font-playfair text-2xl font-bold text-warm-brown">
            Admin Login
          </h1>
          <p className="text-sm text-warm-brown/60 mt-1">
            Jungle Flavorz invoice panel
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-warm-brown">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-warm-brown/15 focus:border-rich-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-warm-brown">Password</label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-3 pr-10 py-2 rounded-lg border border-warm-brown/15 focus:border-rich-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-warm-brown/50 hover:text-warm-brown transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-warm-brown text-cream-white font-semibold hover:bg-bronze transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
