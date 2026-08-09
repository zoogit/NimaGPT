import { caseStudies } from "../../data/caseStudies";
import profile from "../../data/profileKnowledge.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nimagpt.netlify.app";

export function GET() {
  const caseStudyList = caseStudies
    .map(
      (caseStudy) =>
        `- ${caseStudy.shortName}: ${caseStudy.summary} Canonical URL: ${siteUrl}/work/${caseStudy.slug}`
    )
    .join("\n");

  const body = `# ${profile.identity.name}

${profile.identity.title}
${profile.identity.location}

${profile.identity.summary}

## Positioning

${profile.identity.positioningStatement}

## Case Studies

${caseStudyList}

## Skills

AI: ${profile.skillCategories.AI.skills.join(", ")}
Software: ${profile.skillCategories.Software.skills.join(", ")}
Leadership: ${profile.skillCategories.Leadership.skills.join(", ")}

## Canonical Pages

- Home: ${siteUrl}
- Case study index: ${siteUrl}/work
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
