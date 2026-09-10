import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/data/site";

/**
 * A sitemap needs absolute URLs. When the production domain is not
 * known (see site.ts), an empty sitemap is emitted rather than one
 * pointing at a guessed host.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
