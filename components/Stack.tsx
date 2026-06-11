import Image from "next/image";
import { STACK_ROWS } from "@/lib/data";

export default function Stack() {
  return (
    <section id="stack" className="border-b border-line bg-paper py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-7xl px-5 md:px-8">
        <p className="eyebrow mb-4 text-violet-600">The arsenal</p>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">
          Built on the stack of the{" "}
          <span className="accent-violet whitespace-nowrap">top 1%</span>
        </h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-700">
          We operate the same tooling the best GTM teams in the world run on —
          and we wire it together so you don&rsquo;t have to.
        </p>
      </div>

      <div
        className="space-y-5 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {STACK_ROWS.map((row, r) => (
          <div
            key={r}
            className={`marquee-track ${r % 2 ? "reverse" : ""}`}
            style={{ "--marquee-duration": r % 2 ? "46s" : "38s" } as React.CSSProperties}
          >
            {[...row, ...row].map((tool, i) => (
              <span
                key={i}
                className="mx-3 inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-line bg-violet-50 px-6 py-3.5 text-sm font-semibold text-violet-600 transition-colors hover:border-violet-300"
              >
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] rounded-[5px] object-contain"
                  unoptimized
                />
                {tool.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
