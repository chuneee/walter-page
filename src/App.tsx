import { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AboutMe } from "./components/AboutMe";
import { Services } from "./components/Services";
import { WhyChooseMe } from "./components/WhyChooseMe";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner@2.0.3";
import faviconImage from "figma:asset/082fe4e6830fa54464c4195a81a1641fd524c476.png";

export default function App() {
  // Set favicon
  useEffect(() => {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/png";
    link.rel = "icon";
    link.href = faviconImage;
    document.getElementsByTagName("head")[0].appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      <Header />
      <section id="inicio">
        <Hero />
      </section>
      <section id="sobre-mi">
        <AboutMe />
      </section>
      <section id="servicios">
        <Services />
      </section>
      <section id="beneficios">
        <WhyChooseMe />
      </section>
      <section id="contacto">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}
