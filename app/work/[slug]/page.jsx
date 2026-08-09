import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "../../../data/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Nima Maghame"
    };
  }

  return {
    title: `${caseStudy.shortName} Case Study | Nima Maghame`,
    description: caseStudy.summary
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="portfolio-page">
      <nav className="top-nav" aria-label="Portfolio navigation">
        <Link href="/">Nima Maghame</Link>
        <Link href="/work">All Case Studies</Link>
      </nav>

      <article className="case-study">
        <header className="case-study-header">
          <p className="eyebrow">{caseStudy.client}</p>
          <h1>{caseStudy.title}</h1>
          <p>{caseStudy.summary}</p>

          <dl className="case-meta">
            <div>
              <dt>Role</dt>
              <dd>{caseStudy.role}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{caseStudy.type}</dd>
            </div>
          </dl>

          {caseStudy.note && <p className="case-note">{caseStudy.note}</p>}
        </header>

        <section className="case-highlights" aria-label="Case study highlights">
          {caseStudy.highlights.map((highlight) => (
            <p key={highlight}>{highlight}</p>
          ))}
        </section>

        <section className="case-sections" aria-label="Full case study">
          {caseStudy.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </section>

        {caseStudy.links?.length > 0 && (
          <section className="case-links" aria-label="Project links">
            <h2>Project Links</h2>
            {caseStudy.links.map((link) => (
              <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
          </section>
        )}
      </article>
    </main>
  );
}
