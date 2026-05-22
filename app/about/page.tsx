import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "Meet Chef Linda — Jungle Flavorz",
  description:
    "Meet Chef Linda, founder of Jungle Flavorz. Born in Burundi, she brings authentic East African flavors to Austin through love, faith, and hospitality.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-cream-white">
        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-br from-warm-brown via-bronze to-warm-brown text-cream-white">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: "url(/jungle_flavorz.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-brown/70 to-warm-brown/95" />
          <div className="container relative z-10 text-center">
            <span className="inline-block text-rich-gold font-dancing text-2xl mb-3">
              Our Founder
            </span>
            <h1 className="font-playfair text-5xl md:text-7xl font-black leading-tight">
              Meet Chef Linda
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-cream-white/80">
              Founder of Jungle Flavorz — bringing the warmth of Burundi to
              every table she sets.
            </p>
          </div>
        </section>

        <AboutClient />

        {/* CTA */}
        <section className="section-padding bg-soft-beige/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center bg-white border border-rich-gold/15 rounded-3xl p-10 shadow-xl">
              <h3 className="font-playfair text-3xl md:text-4xl font-bold text-warm-brown mb-4">
                Taste the love behind every dish
              </h3>
              <p className="text-warm-brown/70 mb-8">
                Whether it&apos;s a wedding, corporate gathering, or family
                celebration — let Chef Linda bring her heritage to your table.
              </p>
              <Link
                href="/#contact"
                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-rich-gold to-caramel text-cream-white font-semibold shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
