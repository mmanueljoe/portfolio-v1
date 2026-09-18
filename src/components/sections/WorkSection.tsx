import { ProjectEntry } from "@/components/sections/ProjectEntry";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { PROJECTS } from "@/lib/projects";

export function WorkSection() {
  return (
    <section id="work" className="px-gutter pb-section">
      <div className="mx-auto w-full max-w-page">
        <SectionHead title="Selected work" meta="THREE PROJECTS" />

        <div className="mt-11 grid gap-entry">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.title}>
              <ProjectEntry project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
