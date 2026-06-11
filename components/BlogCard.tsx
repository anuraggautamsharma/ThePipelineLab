"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate, type Post } from "@/lib/blog-shared";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FeaturedCard({ post }: { post: Post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease }}
    >
      <Link
        href={`/blog/${post.slug}`}
        data-cursor
        className="group grid overflow-hidden rounded-3xl border border-line-dark bg-violet-900/35 backdrop-blur transition-colors duration-500 hover:border-lime-400/50 hover:bg-violet-900/60 md:grid-cols-[1.2fr_1fr]"
      >
        <div className="flex flex-col justify-between p-8 md:p-12">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-lime-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-950">
                Latest
              </span>
              {post.tags.map((t) => (
                <span key={t} className="eyebrow text-violet-300/70">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="display mt-6 text-3xl text-white transition-colors duration-300 group-hover:text-lime-400 md:text-5xl">
              {post.title}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-violet-100/65">
              {post.description}
            </p>
          </div>
          <div className="mt-10 flex items-center gap-4 text-xs font-medium text-violet-300/70">
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-violet-300/40" />
            <span>{post.readingTime} min read</span>
            <span className="ml-auto text-xl text-violet-300/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-lime-400">
              →
            </span>
          </div>
        </div>
        <div className="relative hidden items-center justify-center overflow-hidden border-l border-line-dark md:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-transparent" />
          <span className="display select-none text-[10rem] text-violet-800/60 transition-transform duration-700 group-hover:scale-110">
            ¶
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        data-cursor
        className="group flex h-full flex-col justify-between rounded-3xl border border-line-dark bg-violet-900/35 p-8 backdrop-blur transition-colors duration-500 hover:border-lime-400/50 hover:bg-violet-900/60"
      >
        <div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line-dark px-3 py-1 text-[11px] font-semibold text-violet-300"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="display mt-6 text-2xl text-white transition-colors duration-300 group-hover:text-lime-400">
            {post.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-violet-100/60">
            {post.description}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-3 border-t border-line-dark pt-5 text-xs font-medium text-violet-300/70">
          <span>{formatDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-violet-300/40" />
          <span>{post.readingTime} min read</span>
          <span className="ml-auto transition-all duration-300 group-hover:translate-x-1 group-hover:text-lime-400">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
