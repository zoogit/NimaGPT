import { caseStudies } from "../data/caseStudies";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nimagpt.netlify.app";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date()
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date()
    },
    ...caseStudies.map((caseStudy) => ({
      url: `${siteUrl}/work/${caseStudy.slug}`,
      lastModified: new Date()
    }))
  ];
}
