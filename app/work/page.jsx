import Link from "next/link";
import { caseStudies } from "../../data/caseStudies";

export const metadata = {
  title: "Case Studies | Nima Maghame",
  description:
    "Readable case studies for Nima Maghame's design leadership, brand, product, AI-assisted workflow, and interactive portfolio work."
};

export default function WorkPage() {
  return (
    <main className="portfolio-page">
      <nav className="top-nav" aria-label="Portfolio navigation">
        <Link href="/">Nima Maghame</Link>
        <Link href="/work">Case Studies</Link>
      </nav>

      <section className="page-hero">
        <p className="eyebrow">Case Studies</p>
        <h1>Readable project stories for humans, search, and LLMs.</h1>
        <p>
          Each case study has its own URL and renders as normal HTML, so the
          work is understandable without depending on tabs, embeds, or chat.
        </p>
      </section>

      <section className="case-grid" aria-label="Case study list">
        {caseStudies.map((caseStudy) => (
          <article className="case-card" key={caseStudy.slug}>
            <p className="eyebrow">{caseStudy.type}</p>
            <h2>{caseStudy.shortName}</h2>
            <p>{caseStudy.summary}</p>
            <Link href={`/work/${caseStudy.slug}`}>Read case study</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
