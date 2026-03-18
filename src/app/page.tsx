import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Stats from "@/components/Stats";
import Booking from "@/components/Booking";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Portfolio />
      <Booking />
      <Contact />
    </>
  );
}
