import { education } from "@/data/experience";
import { capabilities, profile, socials } from "@/data/profile";
import { siteUrl } from "@/data/site";

/**
 * schema.org Person markup. Every field maps to data already published
 * on the site — nothing is added purely for SEO.
 */
export default function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    ...(siteUrl ? { url: siteUrl, image: `${siteUrl}${profile.photo}` } : {}),
    sameAs: socials.map((s) => s.href),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.institution,
    },
    knowsAbout: capabilities.map((c) => c.title),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output of static, first-party data — no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
