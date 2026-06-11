import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Get in Touch — The Pipeline Lab",
  description:
    "Tell us about your GTM motion and we'll map what your revenue engine could look like. Or book a 30-minute strategy call directly.",
};

export default function GetInTouchPage() {
  return (
    <main className="bg-violet-950">
      <PageHeader
        eyebrow="Get in touch"
        titleTop="Let's map"
        titleAccent="your engine."
        sub="Tell us about your motion and we'll come to the first call with a point of view — your ICP, your channels, and what your system could look like."
      />
      <ContactForm />
    </main>
  );
}
