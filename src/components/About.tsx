import { Heart, Users, Award, Clock } from "lucide-react";

export const About = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Events Catered" },
    { icon: Clock, value: "10+", label: "Years Experience" },
    { icon: Award, value: "5-Star", label: "Rated Service" },
    { icon: Heart, value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-cream-white via-champagne/20 to-soft-beige/30">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-rich-gold/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-caramel/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <span className="inline-block text-primary font-dancing text-2xl mb-2">Our Story</span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              From Our Kitchen to Your Table
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded by <strong className="text-foreground">Linda Horukeye</strong>, Jungle Flavorz brings the authentic tastes of East Africa to Austin's vibrant culinary scene. With over a decade of experience, we've become the trusted choice for tech companies, multicultural weddings, and cultural celebrations.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our passion is creating unforgettable dining experiences that celebrate the rich culinary heritage of Burundi, Kenya, and Tanzania. Every dish tells a story of tradition, flavor, and cultural pride.
            </p>

            <div className="pt-4">
              <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To bring authentic East African flavors to every table, creating memorable experiences that honor our heritage while delighting modern palates.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl border border-rich-gold/20 hover-lift hover:border-rich-gold/60 transition-all duration-300 group shadow-lg hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rich-gold/30 to-caramel/30 backdrop-blur-sm flex items-center justify-center group-hover:from-rich-gold/40 group-hover:to-caramel/40 transition-all duration-300 border border-white/40">
                      <Icon className="w-6 h-6 text-bronze" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
