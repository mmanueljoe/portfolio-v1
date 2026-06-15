import { SectionLabel } from "@/components/ui/SectionLabel";

export function AboutSection() {
  return (
    <section id="about" className="bg-surface py-24">
      <div className="mx-auto w-full max-w-2xl px-6">
        <SectionLabel>About</SectionLabel>

        <div className="mt-8 flex flex-col gap-6 font-body text-md leading-relaxed text-on-surface text-justify hyphens-auto">
          <p>
            I'm a software engineer with a particular way of working. Careful,
            systems-oriented, and always thinking about the person on the other
            side of what I'm building. I work across the stack, from interfaces
            to APIs, and I hold the same standard at both ends.
          </p>
          <p>
            I don't separate technical skill from human understanding. I think
            they're the same thing, expressed differently. The best interfaces
            are backed by well-structured systems; the best systems were shaped
            around someone's real workflow. I try to hold both at once.
          </p>
          <p>
            That conviction didn't come from a plan. I didn't grow up with a map
            into tech. Where I'm from, career guidance and good resources were
            scarce, and I came to computer science almost by accident. What made
            it real was changing how I learn: I finished with a first-class
            degree, but the lesson that stuck was to stop memorizing to pass and
            start genuinely understanding.
          </p>
          <p>
            I'm a lover of wisdom by temperament: endlessly curious, and
            convinced that knowledge is connected. I read widely across
            philosophy, psychology, design, art, and music. None of it is a
            detour; the bigger picture makes me a better engineer, and a better
            person. I'm working to be T-shaped, broad across many things and
            deep where it counts.
          </p>
          <p>
            Right now, where I'm going deep is AI. I'm headed into a Master's in
            it next.
          </p>
        </div>
      </div>
    </section>
  );
}
