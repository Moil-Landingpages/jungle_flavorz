import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-cream mb-4">
              Jungle Flavorz
            </h3>
            <p className="text-sm leading-relaxed mb-6">
              Authentic East African catering bringing the flavors of Burundi, Kenya, and Tanzania to Austin's most memorable events.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="hover:text-accent transition-colors duration-300"
                >
                  Menu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-accent transition-colors duration-300"
                >
                  Get a Quote
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition-colors duration-300">
                  Our Services
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>Corporate Events</li>
              <li>Weddings & Parties</li>
              <li>Cultural Celebrations</li>
              <li>Chef's Table Experience</li>
              <li>Free Tastings</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+17373411905" className="hover:text-accent transition-colors duration-300 block">
                    737-341-1905
                  </a>
                  <a href="tel:+17372538952" className="hover:text-accent transition-colors duration-300 block">
                    (737) 253-8952
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:Linda@jungleflavorz.com" className="hover:text-accent transition-colors duration-300">
                  Linda@jungleflavorz.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  Austin, TX 78746
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {currentYear} Jungle Flavorz. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-accent transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-accent transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
