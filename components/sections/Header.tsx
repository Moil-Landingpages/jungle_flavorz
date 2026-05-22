"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

const NAV = [
  { href: "/#menu", label: "Menu" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setPastHero(y > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        pastHero
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        scrolled
          ? "bg-cream-white/85 backdrop-blur-xl border-b border-rich-gold/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rich-gold to-caramel flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="font-playfair text-cream-white text-xl font-black">
              JF
            </span>
          </div>
          <div className="hidden sm:block leading-tight">
            <div
              className={`font-playfair text-xl font-black tracking-tight ${
                scrolled ? "text-warm-brown" : "text-white"
              }`}
            >
              Jungle Flavorz
            </div>
            <div
              className={`text-[10px] uppercase tracking-[0.2em] ${
                scrolled ? "text-caramel" : "text-rich-gold"
              }`}
            >
              East African Catering
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-rich-gold ${
                scrolled ? "text-warm-brown/80" : "text-white/90"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="ml-4 px-5 py-2.5 rounded-full bg-gradient-to-r from-rich-gold to-caramel text-cream-white text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Request Quote
          </Link>
        </nav>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className={`lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors shadow-md ${
            scrolled
              ? "bg-warm-brown text-cream-white hover:bg-warm-brown/90"
              : "bg-warm-brown/80 text-cream-white backdrop-blur-md border border-white/20 hover:bg-warm-brown"
          }`}
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>
      </header>

      {/* Mobile drawer — rendered as a sibling of <header> so its `fixed` positioning is relative to the viewport, not the transformed header. */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[70] bg-warm-brown text-cream-white overflow-y-auto">
          <div className="container flex items-center justify-between h-20">
            <span className="font-playfair text-xl font-bold">Menu</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="container mt-8 flex flex-col gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-playfair font-semibold hover:text-rich-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-rich-gold to-caramel text-cream-white font-semibold text-center"
            >
              Request Quote
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
