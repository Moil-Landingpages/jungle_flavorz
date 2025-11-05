import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Manager, Apple",
      content: "Jungle Flavorz transformed our corporate retreat with authentic East African cuisine. The attention to detail and flavor profiles were exceptional. Our team from diverse backgrounds all raved about the food!",
      rating: 5,
      company: "Apple",
    },
    {
      name: "Michael Chen",
      role: "Wedding Couple",
      content: "Linda and her team made our multicultural wedding absolutely perfect. They honored both our Ethiopian and Chinese heritages beautifully. The Jollof Rice and Jungle Chicken were guest favorites!",
      rating: 5,
      company: "Private Event",
    },
    {
      name: "Priya Patel",
      role: "HR Director, Tesla",
      content: "We've used Jungle Flavorz for multiple company events, and they never disappoint. The variety of options for dietary restrictions and the authentic flavors make them our go-to caterer.",
      rating: 5,
      company: "Tesla",
    },
    {
      name: "James Williams",
      role: "Community Organizer",
      content: "For our cultural festival celebrating African heritage, Jungle Flavorz delivered beyond expectations. The traditional preparation methods and imported ingredients made all the difference. Absolutely authentic!",
      rating: 5,
      company: "Community Event",
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-dancing text-2xl mb-2">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from the companies and individuals we've served
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="hover-lift border-2 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group bg-card"
            >
              <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors duration-300">
                <Quote className="w-16 h-16" />
              </div>
              
              <CardContent className="pt-6 relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/20 rounded-full">
            <Star className="w-5 h-5 fill-accent text-accent" />
            <span className="font-semibold text-foreground">5.0 Average Rating</span>
            <span className="text-muted-foreground">• 100+ Happy Clients</span>
          </div>
        </div>
      </div>
    </section>
  );
};
