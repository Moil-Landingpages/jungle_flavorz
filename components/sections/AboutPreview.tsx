"use client";

import Link from "next/link";
import { Heart, Users, Award, Clock, ArrowRight } from "lucide-react";
import { useGsapReveal } from "@/lib/useGsapReveal";

const STATS = [
  { icon: Users, value: "500+", label: "Events Catered" },
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: Award, value: "5-Star", label: "Rated Service" },
  { icon: Heart, value: "100%", label: "Client Satisfaction" },
];

export function AboutPreview() {
  const ref = useGsapReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="section-padding relative overflow-hidden bg-gradient-to-br from-cream-white via-champagne/15 to-soft-beige/25"
    >
      <div className="absolute top-10 right-10 w-72 h-72 bg-rich-gold/15 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-caramel/12 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span
              data-reveal
              className="inline-block text-caramel font-dancing text-2xl"
            >
              Our Story
            </span>

            <h2
              data-reveal
              className="font-playfair text-4xl md:text-5xl lg:text-6xl font-black text-warm-brown leading-tight"
            >
              From our kitchen
              <br />
              to your table
            </h2>

            <p data-reveal className="text-lg text-warm-brown/75 leading-relaxed">
              Founded by{" "}
              <strong className="text-warm-brown">Chef Linda</strong>, Jungle
              Flavorz brings the authentic tastes of Burundi and East Africa to
              Austin&apos;s vibrant culinary scene. With over a decade of
              experience, we&apos;ve become the trusted choice for tech
              companies, multicultural weddings, and cultural celebrations.
            </p>

            <p data-reveal className="text-lg text-warm-brown/75 leading-relaxed">
              Every dish tells a story of tradition, heritage, and the warmth of
              East African hospitality.
            </p>

            <div data-reveal>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-2 px-7 py-3 rounded-full bg-warm-brown text-cream-white hover:bg-bronze transition-colors font-semibold group"
              >
                Meet Chef Linda
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  data-reveal
                  className="bg-white/70 backdrop-blur-lg p-7 rounded-2xl border border-rich-gold/15 hover:border-rich-gold/50 hover:-translate-y-1 transition-all duration-300 group shadow-lg hover:shadow-xl text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rich-gold/25 to-caramel/25 flex items-center justify-center mx-auto mb-4 border border-white/40">
                    <Icon className="w-5 h-5 text-bronze" />
                  </div>
                  <div className="font-playfair text-3xl font-bold text-warm-brown">
                    {s.value}
                  </div>
                  <div className="text-sm text-warm-brown/60 mt-1">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
