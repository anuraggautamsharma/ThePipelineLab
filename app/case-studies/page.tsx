import type { Metadata } from "next";
import { CASE_STUDIES, CALENDLY_URL } from "@/lib/data";
import CaseCard from "@/components/CaseCard";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Case Studies — The Pipeline Lab",
  description:
    "How B2B companies in aerospace, healthcare, fintech and sustainability generated pipeline with engineered outbound systems.",
};

export default function CaseStudiesPage() {
  return (
    <main className="bg-paper-soft">
      <PageHeader
        eyebrow="Case studies"
        titleTop="Proof,"
        titleAccent="engineered."
        sub="Real systems, real markets, real revenue. Six engagements across considered-purchase industries where spray-and-pray outbound goes to die."
      />

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[88rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <CaseCard key={cs.slug} cs={cs} index={i} />
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-3xl rounded-3xl bg-violet-600 p-10 text-center md:p-14">
          <h2 className="display text-3xl text-white md:text-4xl">
            Your market could be{" "}
            <span className="italic font-normal text-lime-400">next</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/75">
            Every one of these started with a 30-minute strategy call. We&rsquo;ll
            map your ICP and show you what your engine would look like.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-400 px-8 py-4 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-105"
          >
            Book Your Strategy Call <span aria-hidden>↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
