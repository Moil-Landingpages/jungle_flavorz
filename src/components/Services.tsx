import { Building2, Heart, Users, ChefHat } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Corporate Events",
      description: "Impress clients and colleagues with authentic East African cuisine. Perfect for team lunches, conferences, and company celebrations.",
      features: ["Flexible menus", "Professional service", "Tech company favorites", "Dietary accommodations"],
      color: "primary",
    },
    {
      icon: Heart,
      title: "Weddings & Private Parties",
      description: "Make your special day unforgettable with culturally rich, delicious cuisine that honors your heritage and delights your guests.",
      features: ["Custom menus", "Full-service catering", "Cultural authenticity", "10-200 guests"],
      color: "secondary",
    },
    {
      icon: Users,
      title: "Cultural Celebrations",
      description: "Celebrate your heritage with traditional dishes prepared authentically. Perfect for community events and cultural festivals.",
      features: ["Traditional recipes", "Cultural consultation", "Large-scale events", "Authentic ingredients"],
      color: "accent",
    },
    {
      icon: ChefHat,
      title: "Chef's Table Experience",
      description: "Intimate dining experiences where Chef Linda creates a personalized journey through East African flavors.",
      features: ["Intimate settings", "Custom tasting menus", "Interactive experience", "Wine pairings available"],
      color: "primary",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-cream-white via-soft-beige/10 to-warm-brown/5">
      {/* Decorative gradient orb */}
      <div className="absolute top-20 -right-40 w-96 h-96 bg-rich-gold/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-caramel/15 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-dancing text-2xl mb-2">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Catering Services for Every Occasion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From intimate gatherings to large corporate events, we bring authentic East African flavors to your table
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="hover-lift border border-rich-gold/10 hover:border-rich-gold/30 transition-all duration-300 group overflow-hidden bg-white/60 backdrop-blur-lg shadow-xl hover:shadow-2xl"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rich-gold/20 to-caramel/20 backdrop-blur-sm flex items-center justify-center group-hover:from-rich-gold/30 group-hover:to-caramel/30 transition-all duration-300 flex-shrink-0 border border-white/30">
                      <Icon className="w-7 h-7 text-caramel" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-8 max-w-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-3 text-foreground">Not sure which service fits your needs?</h3>
            <p className="text-muted-foreground mb-6">
              Let's chat about your event and create a custom experience that exceeds your expectations.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-gradient-to-r from-rich-gold to-caramel hover:from-caramel hover:to-rich-gold text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
            >
              Get a Custom Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
