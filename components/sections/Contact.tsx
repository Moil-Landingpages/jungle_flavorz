"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useGsapReveal } from "@/lib/useGsapReveal";

export function Contact() {
  const ref = useGsapReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send quote");

      toast.success("Quote request received!", {
        description:
          "We'll get back to you within 2 business hours. Check your inbox for confirmation.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        guestCount: "",
        date: "",
        message: "",
      });
    } catch (err: any) {
      toast.error("Couldn't send your request", {
        description: err.message || "Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-cream-white"
    >
      <div className="container">
        <div className="text-center mb-14">
          <span
            data-reveal
            className="inline-block text-caramel font-dancing text-2xl mb-2"
          >
            Get in Touch
          </span>
          <h2
            data-reveal
            className="font-playfair text-4xl md:text-5xl font-black text-warm-brown mb-4"
          >
            Let&apos;s plan your perfect event
          </h2>
          <p
            data-reveal
            className="text-lg text-warm-brown/70 max-w-2xl mx-auto"
          >
            Ready to bring authentic Burundian flavors to your event? Fill out
            the form below or give us a call.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div
            data-reveal
            className="bg-white border border-warm-brown/10 rounded-3xl p-8 shadow-lg"
          >
            <h3 className="font-playfair text-2xl font-bold mb-6 text-warm-brown">
              Request a Quote
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(737) 341-1905"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="eventType">Event Type *</Label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select type</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="wedding">Wedding/Private Party</option>
                    <option value="cultural">Cultural Event</option>
                    <option value="chef">Chef&apos;s Table Experience</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guestCount">Number of Guests *</Label>
                  <Input
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 50"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Event Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">Additional Details</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your event, dietary requirements, or any special requests..."
                  rows={5}
                  className="mt-1.5"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-rich-gold to-caramel hover:from-caramel hover:to-rich-gold text-cream-white font-semibold py-6 text-base shadow-lg"
              >
                {isSubmitting ? "Sending..." : "Get Your Free Quote"}
              </Button>

              <p className="text-xs text-warm-brown/55 text-center">
                By submitting, you agree to receive communication from Jungle
                Flavorz.
              </p>
            </form>
          </div>

          <div data-reveal className="space-y-6">
            <div className="bg-white border border-warm-brown/10 rounded-3xl p-8 shadow-lg">
              <h3 className="font-playfair text-2xl font-bold mb-6 text-warm-brown">
                Contact Information
              </h3>

              <div className="space-y-5">
                <ContactRow
                  icon={Phone}
                  title="Phone"
                  body={
                    <a
                      href="tel:+17373411905"
                      className="text-warm-brown/70 hover:text-bronze transition-colors"
                    >
                      737-341-1905
                    </a>
                  }
                />
                <ContactRow
                  icon={Mail}
                  title="Email"
                  body={
                    <a
                      href="mailto:Linda@jungleflavorz.com"
                      className="text-warm-brown/70 hover:text-bronze transition-colors"
                    >
                      Linda@jungleflavorz.com
                    </a>
                  }
                />
                <ContactRow
                  icon={MapPin}
                  title="Location"
                  body={<span className="text-warm-brown/70">Austin, TX 78746</span>}
                />
                <ContactRow
                  icon={Clock}
                  title="Business Hours"
                  body={
                    <p className="text-warm-brown/70">
                      Monday – Friday: 9AM – 7PM
                      <br />
                      Saturday: 10AM – 6PM
                      <br />
                      Sunday: Closed
                    </p>
                  }
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-rich-gold/10 to-caramel/10 border border-rich-gold/20 rounded-3xl p-8 text-center">
              <h3 className="font-playfair text-2xl font-bold mb-3 text-warm-brown">
                Book a Free Tasting
              </h3>
              <p className="text-warm-brown/70 mb-6">
                Experience our authentic flavors firsthand. Complimentary
                tasting for events of 50+ guests.
              </p>
              <a
                href="tel:+17373411905"
                className="inline-block px-7 py-3 bg-warm-brown text-cream-white hover:bg-bronze rounded-full font-semibold transition-colors"
              >
                Call to Schedule
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-rich-gold/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-bronze" />
      </div>
      <div>
        <div className="font-semibold mb-1 text-warm-brown">{title}</div>
        {body}
      </div>
    </div>
  );
}
