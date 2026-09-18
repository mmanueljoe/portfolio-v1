import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

const SKILL_GROUPS = [
  {
    label: "Shipping with",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "REST API design",
      "JWT authentication",
      "Git",
      "Vercel",
    ],
  },
  {
    label: "Comfortable with",
    skills: [
      "Vue 3",
      "Express.js",
      "GraphQL",
      "MongoDB",
      "MySQL",
      "Docker",
      "Zustand",
      "Context API",
      "Figma",
      "Postman",
    ],
  },
  {
    label: "Certified",
    skills: ["AWS Cloud Practitioner, 2025"],
  },
  {
    label: "Exploring",
    skills: [
      "AI/ML fundamentals",
      "GraphQL subscriptions",
      "Advanced PostgreSQL",
    ],
  },
  {
    label: "Also worked with",
    skills: ["Solidity", "Motoko", "ICP", "Web3.js"],
  },
];

// The only inverted section on the page. Rules sit on each row rather than on
// the list: a container background showing through a `gap` leaves a visible
// plate whenever auto-fit resolves to a column count that doesn't divide evenly.
export function SkillsSection() {
  return (
    <section id="skills" className="bg-surface-alt px-gutter py-section">
      <Reveal className="mx-auto w-full max-w-page">
        <SectionHead title="Skills" meta="SORTED HONESTLY" tone="alt" />

        <dl className="mt-2 grid">
          {SKILL_GROUPS.map((group, index) => (
            <div
              key={group.label}
              className={`grid grid-pair-skills gap-x-8 gap-y-2 border-t border-hairline-alt py-6 ${
                index === SKILL_GROUPS.length - 1 ? "border-b" : ""
              }`}
            >
              <dt className="font-display text-skill-term font-semibold text-on-surface-alt">
                {group.label}
              </dt>
              <dd className="font-body text-skill-value text-on-surface-alt-muted">
                {group.skills.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
