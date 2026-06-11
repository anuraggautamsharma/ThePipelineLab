import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { CALENDLY_URL } from "@/lib/data";
import ReadingProgress from "@/components/ReadingProgress";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — The Pipeline Lab`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://thepipelinelab.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const next = posts[(index + 1) % posts.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "The Pipeline Lab", url: "https://thepipelinelab.com" },
    publisher: { "@type": "Organization", name: "The Pipeline Lab" },
    mainEntityOfPage: `https://thepipelinelab.com/blog/${post.slug}`,
  };

  return (
    <main>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden border-b border-line bg-paper px-5 pb-14 pt-36 md:px-10 md:pb-18 md:pt-48">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[55vh] w-[55vh] rounded-full opacity-70 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(206,179,255,0.5), rgba(255,255,255,0))",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-medium text-ink-faint transition-colors hover:text-violet-600"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            All posts
          </Link>

          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold text-violet-600"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="display mt-6 text-4xl text-ink md:text-6xl">{post.title}</h1>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium text-ink-faint">
            <span>{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-violet-300" />
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-violet-300" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* ── Article ── */}
      <article className="bg-paper px-5 py-16 md:px-10 md:py-24">
        <div className="prose prose-tpl mx-auto max-w-3xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {/* inline CTA */}
        <aside className="mx-auto mt-16 max-w-3xl rounded-3xl bg-violet-600 p-8 md:p-10">
          <p className="eyebrow mb-3 !text-lime-400">Put this to work</p>
          <p className="display text-2xl text-white md:text-3xl">
            Want this engineered for you instead?
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75">
            We build these systems end-to-end — data, deliverability,
            multichannel orchestration. 30 minutes, and you&rsquo;ll leave with a
            blueprint either way.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.04]"
          >
            Book a Strategy Call <span aria-hidden>↗</span>
          </a>
        </aside>
      </article>

      {/* ── Next post ── */}
      <section className="border-t border-line bg-paper-soft px-5 py-14 md:px-10 md:py-16">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-8">
          <Link href={`/blog/${next.slug}`} className="group min-w-0" data-cursor>
            <p className="eyebrow mb-3 !text-ink-faint">Read next</p>
            <p className="display truncate text-xl text-ink transition-colors duration-300 group-hover:text-violet-600 md:text-3xl">
              {next.title}
            </p>
          </Link>
          <span className="shrink-0 text-2xl text-violet-600" aria-hidden>
            →
          </span>
        </div>
      </section>
    </main>
  );
}
