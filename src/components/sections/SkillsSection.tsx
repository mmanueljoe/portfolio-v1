import { SectionLabel } from "@/components/ui/SectionLabel";

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
      "JWT Authentication",
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
    skills: ["AWS Cloud Practitioner (2025)"],
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

export function SkillsSection() {
  return (
    <section id="skills" className="bg-surface py-24">
      <div className="mx-auto w-full max-w-4xl px-6">
        <SectionLabel>Skills</SectionLabel>

        <dl className="mt-12 flex flex-col divide-y divide-on-surface/10">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              className="flex flex-col gap-2 py-6 first:pt-0 last:pb-0 md:flex-row md:gap-8"
            >
              <dt className="shrink-0 font-display text-base font-semibold text-on-surface md:w-48">
                {group.label}
              </dt>
              <dd className="font-body text-base leading-relaxed text-on-surface-muted">
                {group.skills.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
