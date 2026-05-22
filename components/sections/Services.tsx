"use client";

import Link from "next/link";
import { Building2, Heart, Users, ChefHat } from "lucide-react";
import { useGsapReveal } from "@/lib/useGsapReveal";

const SERVICES = [
  {
    icon: Building2,
    title: "Corporate Events",
    description:
      "Impress clients and colleagues with authentic East African cuisine. Perfect for team lunches, conferences, and company celebrations.",
    features: [
      "Flexible menus",
      "Professional service",
      "Tech company favorites",
      "Dietary accommodations",
    ],
  },
  {
    icon: Heart,
    title: "Weddings & Private Parties",
    description:
      "Make your special day unforgettable with culturally rich, delicious cuisine that honors your heritage and delights your guests.",
    features: [
      "Custom menus",
      "Full-service catering",
      "Cultural authenticity",
      "10–200 guests",
    ],
  },
  {
    icon: Users,
    title: "Cultural Celebrations",
    description:
      "Celebrate heritage with traditional dishes prepared authentically — perfect for community events and cultural festivals.",
    features: [
      "Traditional recipes",
      "Cultural consultation",
      "Large-scale events",
      "Authentic ingredients",
    ],
  },
  {
    icon: ChefHat,
    title: "Chef's Table Experience",
    description:
      "Intimate dining experiences where Chef Linda creates a personalized journey through East African flavors.",
    features: [
      "Intimate settings",
      "Custom tasting menus",
      "Interactive experience",
      "Wine pairings available",
    ],
  },
];

export function Services() {
  const ref = useGsapReveal();
  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding relative overflow-hidden bg-gradient-to-br from-cream-white via-soft-beige/10 to-warm-brown/5"
    >
      <div className="absolute top-20 -right-40 w-96 h-96 bg-rich-gold/15 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-caramel/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span
            data-reveal
            className="inline-block text-caramel font-dancing text-2xl mb-2"
          >
            What We Offer
          </span>
          <h2
            data-reveal
            className="font-playfair text-4xl md:text-5xl font-black text-warm-brown mb-4"
          >
            Catering for every occasion
          </h2>
          <p
            data-reveal
            className="text-lg text-warm-brown/70 max-w-2xl mx-auto"
          >
            From intimate gatherings to large corporate events, we bring
            authentic East African flavors to your table.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                data-reveal
                className="group bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-rich-gold/10 hover:border-rich-gold/40 hover:-translate-y-1 transition-all duration-400 shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rich-gold/20 to-caramel/20 flex items-center justify-center flex-shrink-0 border border-white/40 group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7 text-bronze" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-warm-brown mb-2 group-hover:text-bronze transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-warm-brown/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ul className="mt-6 grid grid-cols-2 gap-2">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-warm-brown/70"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rich-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div data-reveal className="mt-16 text-center">
          <div className="inline-block bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-8 max-w-2xl shadow-xl">
            <h3 className="font-playfair text-2xl font-bold mb-3 text-warm-brown">
              Not sure which service fits?
            </h3>
            <p className="text-warm-brown/70 mb-6">
              Let&apos;s chat about your event and craft a custom experience.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-rich-gold to-caramel hover:from-caramel hover:to-rich-gold text-cream-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
            >
              Get a Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
