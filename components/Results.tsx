import Link from "next/link";
import { CASE_STUDIES } from "@/lib/data";
import CaseCard from "./CaseCard";

export default function Results() {
  return (
    <section id="results" className="bg-paper-soft px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_3fr]">
          <p className="eyebrow">04 — Proof, not promises</p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="display max-w-2xl text-4xl text-ink md:text-6xl">
              Systems that already{" "}
              <span className="accent">shipped revenue</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Aerospace, healthcare, fintech, sustainability —
              considered-purchase markets where spray-and-pray dies. Exactly
              where engineered outbound wins.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.slice(0, 3).map((cs, i) => (
            <CaseCard key={cs.slug} cs={cs} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-4 text-sm font-medium text-ink transition-colors hover:border-violet-600 hover:text-violet-600"
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
