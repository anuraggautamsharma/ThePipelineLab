import { CLIENT_MARQUEE } from "@/lib/data";

export default function LogoMarquee() {
  const items = [...CLIENT_MARQUEE, ...CLIENT_MARQUEE];
  return (
    <section className="border-b border-line bg-paper py-10">
      <p className="eyebrow mb-7 text-center text-ink-500">
        Trusted by teams in aerospace, healthcare, fintech &amp; SaaS
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="marquee-track" style={{ "--marquee-duration": "40s" } as React.CSSProperties}>
          {items.map((name, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-8 whitespace-nowrap text-lg font-semibold tracking-tight text-ink-900/45"
            >
              {name}
              <span className="h-1.5 w-1.5 rotate-45 bg-violet-300" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
