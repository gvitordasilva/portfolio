import { Hero } from "@/components/sections/Hero";
import { Now } from "@/components/sections/Now";
import { Products } from "@/components/sections/Products";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Now />
        <Products />
        <Work />
        <Process />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
