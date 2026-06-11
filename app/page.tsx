import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Results from "@/components/Results";
import Stack from "@/components/Stack";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <LogoMarquee />
        <Manifesto />
        <Services />
        <Process />
        <Results />
        <Stack />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}
