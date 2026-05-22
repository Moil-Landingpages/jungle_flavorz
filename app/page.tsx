import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { Services } from "@/components/sections/Services";
import { Menu } from "@/components/sections/Menu";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <AboutPreview />
        <Services />
        <Menu />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
