"use client";

import Image from "next/image";
import { Heart, Globe, ChefHat, Users } from "lucide-react";
import { useGsapReveal } from "@/lib/useGsapReveal";

const VALUES = [
  {
    icon: Heart,
    title: "Faith-Driven",
    body: "Faith in Jesus is at the center of everything Chef Linda does — every plate served with love.",
  },
  {
    icon: Globe,
    title: "Six Languages",
    body: "Connecting with people from all backgrounds through food and fellowship.",
  },
  {
    icon: ChefHat,
    title: "Burundian Roots",
    body: "Born in the heart of Burundi, bringing the rich flavors of Africa to Austin.",
  },
  {
    icon: Users,
    title: "Family First",
    body: "A mother of two raising her babies while serving her community with warmth and hospitality.",
  },
];

export function AboutClient() {
  const ref = useGsapReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding"
    >
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <div
              data-reveal
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-cream-white"
            >
              <Image
                src="/chef_linda.jpeg"
                alt="Chef Linda"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-warm-brown/90 to-transparent text-cream-white">
                <div className="font-dancing text-2xl text-rich-gold">
                  Chef Linda
                </div>
                <div className="text-sm uppercase tracking-widest opacity-80">
                  Founder &amp; Chef
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6 text-warm-brown/80 leading-relaxed text-lg">
            <h2
              data-reveal
              className="font-playfair text-3xl md:text-4xl font-black text-warm-brown"
            >
              Hi, I&apos;m Chef Linda
            </h2>

            <p data-reveal>
              Hi, I&apos;m <strong className="text-warm-brown">Chef Linda</strong>,
              founder of Jungle Flavorz! Born in the heart of{" "}
              <strong className="text-warm-brown">Burundi</strong>, I am
              passionate about bringing people together through flavorful,
              homemade food inspired by African culture and community.
            </p>

            <p data-reveal>
              As a mom raising two babies under two, cooking is more than a
              business for me. It&apos;s a way to serve others with love,
              warmth, and hospitality. I speak six languages and deeply value
              connecting with people from all backgrounds through food and
              fellowship.
            </p>

            <p data-reveal>
              My faith in Jesus is at the center of everything I do, and Jungle
              Flavorz was created with a passion for serving people well,
              creating memorable experiences, and sharing the rich flavors of
              Africa with our community.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    data-reveal
                    className="p-5 rounded-2xl bg-white border border-warm-brown/10 hover:border-rich-gold/40 transition-colors shadow-sm hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rich-gold/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-bronze" />
                    </div>
                    <div className="font-semibold text-warm-brown mb-1">
                      {v.title}
                    </div>
                    <p className="text-sm text-warm-brown/70">{v.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
