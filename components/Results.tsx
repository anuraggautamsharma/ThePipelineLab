import Link from "next/link";
import { CASE_STUDIES } from "@/lib/data";
import CaseCard from "./CaseCard";

export default function Results() {
  return (
    <section id="results" className="bg-violet-950 px-5 pb-28 pt-24 md:px-8 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-lime-400">Proof, not promises</p>
            <h2 className="display max-w-2xl text-4xl text-white md:text-6xl">
              Systems that already <span className="accent">shipped revenue</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-violet-100/60">
            Aerospace, healthcare, fintech, sustainability — considered-purchase
            markets where spray-and-pray dies. Exactly where engineered outbound wins.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.slice(0, 3).map((cs, i) => (
            <CaseCard key={cs.slug} cs={cs} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 rounded-full border border-violet-300/30 px-7 py-4 text-sm font-medium text-violet-100 transition-colors hover:border-lime-400 hover:text-lime-400"
          >
            View all case studies
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
