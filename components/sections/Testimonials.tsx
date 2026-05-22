"use client";

import { Star, Quote } from "lucide-react";
import { useGsapReveal } from "@/lib/useGsapReveal";

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Event Manager, Apple",
    content:
      "Jungle Flavorz transformed our corporate retreat with authentic East African cuisine. The attention to detail and flavor profiles were exceptional. Our team from diverse backgrounds all raved about the food!",
    rating: 5,
    company: "Apple",
  },
  {
    name: "Michael Chen",
    role: "Wedding Couple",
    content:
      "Linda and her team made our multicultural wedding absolutely perfect. They honored both our Burundian and Chinese heritages beautifully. The Jollof Rice and Jungle Chicken were guest favorites!",
    rating: 5,
    company: "Private Event",
  },
  {
    name: "Priya Patel",
    role: "HR Director, Tesla",
    content:
      "We've used Jungle Flavorz for multiple company events, and they never disappoint. The variety of options for dietary restrictions and the authentic flavors make them our go-to caterer.",
    rating: 5,
    company: "Tesla",
  },
  {
    name: "James Williams",
    role: "Community Organizer",
    content:
      "For our cultural festival celebrating African heritage, Jungle Flavorz delivered beyond expectations. The traditional preparation methods and imported ingredients made all the difference. Absolutely authentic!",
    rating: 5,
    company: "Community Event",
  },
];

export function Testimonials() {
  const ref = useGsapReveal();
  return (
    <section
      id="testimonials"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-soft-beige/30"
    >
      <div className="container">
        <div className="text-center mb-14">
          <span
            data-reveal
            className="inline-block text-caramel font-dancing text-2xl mb-2"
          >
            Testimonials
          </span>
          <h2
            data-reveal
            className="font-playfair text-4xl md:text-5xl font-black text-warm-brown mb-4"
          >
            What our clients say
          </h2>
          <p
            data-reveal
            className="text-lg text-warm-brown/70 max-w-2xl mx-auto"
          >
            From Fortune 500 boardrooms to family weddings — hear from the
            people we&apos;ve served.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              data-reveal
              className="relative bg-cream-white border border-warm-brown/10 hover:border-rich-gold/40 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl group overflow-hidden"
            >
              <Quote className="absolute top-5 right-5 w-14 h-14 text-rich-gold/10 group-hover:text-rich-gold/20 transition-colors" />
              <div className="flex gap-1 mb-4 relative">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-rich-gold text-rich-gold"
                  />
                ))}
              </div>
              <p className="text-warm-brown/80 mb-6 leading-relaxed">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rich-gold to-caramel flex items-center justify-center font-bold text-cream-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-warm-brown">{t.name}</div>
                  <div className="text-sm text-warm-brown/60">{t.role}</div>
                  <div className="text-xs text-bronze font-medium">
                    {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold/10 border border-rich-gold/20 rounded-full">
            <Star className="w-5 h-5 fill-rich-gold text-rich-gold" />
            <span className="font-semibold text-warm-brown">
              5.0 Average Rating
            </span>
            <span className="text-warm-brown/60">• 100+ Happy Clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}
