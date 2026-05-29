import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-warm-brown text-cream-white/85">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Jungle Flavorz logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <h3 className="font-playfair text-2xl font-bold text-cream-white">
                Jungle Flavorz
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Authentic Burundian and East African catering bringing the
              flavors of Burundi, Kenya, and Tanzania to Austin&apos;s most
              memorable events.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/jungleflavorz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-cream-white/10 hover:bg-rich-gold/30 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/jungleflavorz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-cream-white/10 hover:bg-rich-gold/30 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-cream-white mb-4">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#menu" className="hover:text-rich-gold transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-rich-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-rich-gold transition-colors">
                  About Chef Linda
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-rich-gold transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-cream-white mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>Corporate Events</li>
              <li>Weddings &amp; Parties</li>
              <li>Cultural Celebrations</li>
              <li>Chef&apos;s Table Experience</li>
              <li>Free Tastings</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-cream-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+17373411905"
                  className="hover:text-rich-gold transition-colors"
                >
                  737-341-1905
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:Linda@jungleflavorz.com"
                  className="hover:text-rich-gold transition-colors"
                >
                  Linda@jungleflavorz.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Austin, TX 78746</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {year} Jungle Flavorz. All rights reserved.</p>
            <div className="flex gap-6 text-cream-white/60">
              <a href="#privacy" className="hover:text-rich-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-rich-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
