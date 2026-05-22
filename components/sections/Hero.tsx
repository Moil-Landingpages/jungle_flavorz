"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const spiceColors = ["#8B4513", "#D4AF37", "#DEB887", "#CD853F", "#F5F5DC", "#B8860B"];

    class Particle {
      x = 0;
      y = 0;
      baseSize = 0;
      size = 0;
      speedY = 0;
      speedX = 0;
      color = "";
      opacity = 0;
      rotation = 0;
      rotationSpeed = 0;
      wobble = 0;
      spice: { name: string; shape: string; size: number };
      spiceTypes = [
        { name: "peppercorn", shape: "round", size: 3 },
        { name: "cumin", shape: "oval", size: 4 },
        { name: "clove", shape: "bulb", size: 5 },
        { name: "cardamom", shape: "pod", size: 6 },
        { name: "cinnamon", shape: "stick", size: 8 },
        { name: "saffron", shape: "thread", size: 10 },
      ];

      constructor() {
        this.spice = this.spiceTypes[Math.floor(Math.random() * this.spiceTypes.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.wobble = Math.random() * Math.PI * 2;
        this.reset();
        this.y = Math.random() * canvas!.height;
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height + Math.random() * 100;
        this.baseSize = this.spice.size;
        this.size = this.baseSize;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.color = spiceColors[Math.floor(Math.random() * spiceColors.length)];
        this.opacity = Math.random() * 0.4 + 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.wobble += 0.05;
        this.x += Math.sin(this.wobble) * 0.3;
        this.y += Math.cos(this.wobble * 0.5) * 0.2;

        if (this.y < -20) this.reset();
        if (this.x < -20 || this.x > canvas!.width + 20) this.speedX *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        switch (this.spice.shape) {
          case "round":
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "oval":
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size * 0.8, this.size * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "bulb":
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, -this.size * 0.3, this.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(-this.size * 0.15, -this.size * 0.3, this.size * 0.3, this.size * 0.8);
            break;
          case "pod":
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size * 0.5, this.size * 0.8, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "stick":
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size * 0.15, -this.size * 0.6, this.size * 0.3, this.size * 1.2);
            break;
          case "thread":
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1.5;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(-this.size * 0.4, 0);
            ctx.quadraticCurveTo(0, -this.size * 0.3, this.size * 0.4, 0);
            ctx.stroke();
            break;
        }
        ctx.restore();
      }
    }

    const particleCount = window.innerWidth < 768 ? 30 : 80;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const mouse = { x: null as number | null, y: null as number | null, radius: 100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();

        if (mouse.x && mouse.y) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;

            particle.x += directionX * force * 2;
            particle.y += directionY * force * 2;
          }
        }

        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Faster entrance: ~0.35s duration, tight stagger
  const fade = (delay: number) => ({
    animationDuration: "0.35s",
    animationDelay: `${delay}s`,
    animationFillMode: "both" as const,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/jungle_flavorz.jpg)" }}
      />

      <div className="absolute inset-0 z-[1] bg-black/50" />

      <canvas ref={canvasRef} className="absolute inset-0 z-[2]" />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
        }}
      />

      <div className="container relative z-10 text-center px-4 py-20">
        <div
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8 animate-fade-in-up shadow-lg"
          style={fade(0)}
        >
          <Sparkles className="w-4 h-4 text-rich-gold" />
          <span className="text-sm font-semibold text-white tracking-wider">
            Trusted by EGBI, Dell, IBM &amp; More
          </span>
        </div>

        <h1
          className="font-playfair text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight animate-fade-in-up"
          style={{
            ...fade(0.05),
            textShadow: "3px 3px 12px rgba(0,0,0,0.4)",
          }}
        >
          Authentic East African Flavors
          <br />
          <span>for Austin&apos;s Most Memorable Events</span>
        </h1>

        <p
          className="font-inter text-lg md:text-xl text-white/90 mb-2 max-w-3xl mx-auto font-semibold tracking-wide animate-fade-in-up"
          style={fade(0.1)}
        >
          WHERE CULTURE MEETS CUISINE
        </p>

        <p
          className="font-inter text-lg md:text-xl text-white/85 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
          style={fade(0.15)}
        >
          From Fortune 500 tech companies to intimate multicultural weddings, we
          bring the rich culinary traditions of East Africa to Austin&apos;s
          tables, creating unforgettable experiences that honor heritage and
          unite communities through the universal language of food.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
          style={fade(0.2)}
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("menu")}
            className="relative overflow-hidden bg-gradient-to-r from-rich-gold to-caramel hover:from-caramel hover:to-rich-gold text-white font-bold px-10 py-7 text-lg rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.4)] transition-all duration-400 hover:-translate-y-1"
          >
            Explore Our Menu
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="bg-white/10 hover:bg-white text-white hover:text-warm-brown border-2 border-white/50 hover:border-white font-bold px-10 py-7 text-lg rounded-full backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
          >
            Book a Free Tasting
          </Button>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up"
          style={fade(0.25)}
        >
          {[
            { number: "200+", label: "Events Catered" },
            { number: "47", label: "5-Star Reviews" },
            { number: "15+", label: "Corporate Clients" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 transition-all duration-400 hover:-translate-y-2 hover:bg-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
            >
              <div
                className="font-playfair text-5xl font-extrabold text-rich-gold mb-2"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.3)" }}
              >
                {stat.number}
              </div>
              <div className="text-sm text-white/95 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
