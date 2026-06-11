import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/data";

const BASE = "https://thepipelinelab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/case-studies`, changeFrequency: "monthly", priority: 0.9 },
    ...CASE_STUDIES.map((cs) => ({
      url: `${BASE}/case-studies/${cs.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.9 },
    ...getPosts().map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
