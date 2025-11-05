import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Menu } from "@/components/Menu";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ConversionChat } from "@/components/ConversionChat";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Menu />
      <Testimonials />
      <Contact />
      <Footer />
      <ConversionChat />
    </main>
  );
};

export default Index;
