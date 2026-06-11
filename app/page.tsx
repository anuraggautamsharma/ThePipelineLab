import { FAQS } from "@/lib/data";
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
