import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

const PARAGRAPHS = [
  "I work across the stack, from interfaces to APIs, and I hold the same standard at both ends. Careful, systems-oriented, always thinking about the person on the other side of the thing.",
  "None of that came from a plan. I didn't grow up with a map into tech. Where I'm from, career guidance and good resources were scarce, and I came to computer science almost by accident. What made it real was changing how I learn. I finished with a first-class degree, but the lesson that stuck was smaller: stop memorising to pass, start actually understanding.",
  "I read widely. Philosophy, psychology, design, art, music. None of it is a detour; the bigger picture makes me better at the job. Broad across many things, deep where it counts.",
];

const CLOSER =
  "Right now the deep part is AI. I'm headed into a Master's in it next.";

export function AboutSection() {
  return (
    <section id="about" className="px-gutter pb-section">
      <Reveal className="mx-auto w-full max-w-page">
        <SectionHead title="About" />

        <div className="mt-10 grid grid-pair-entry items-start gap-pair-col">
          <div>
            <p className="mb-5 max-w-quote font-display text-quote font-medium text-on-surface">
              I don&apos;t separate technical skill from human understanding.
              They&apos;re the same thing, said differently.
            </p>
            <p className="max-w-quote-sub font-body text-about-sub text-on-surface-muted">
              The best interfaces are backed by well-structured systems. The
              best systems were shaped around somebody&apos;s real workflow. I
              try to hold both at once.
            </p>
          </div>

          <div className="grid gap-4">
            {PARAGRAPHS.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-prose-wide font-body text-about text-on-surface-muted"
              >
                {paragraph}
              </p>
            ))}
            {/* Full ink rather than muted, so the last line lands. */}
            <p className="max-w-prose-wide font-body text-about text-on-surface">
              {CLOSER}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
