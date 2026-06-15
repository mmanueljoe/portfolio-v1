import { ProjectScene } from "@/components/sections/ProjectScene";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PROJECTS } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-surface py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Selected Work</SectionLabel>
        </Reveal>

        <div className="mt-16 flex flex-col gap-24">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.title}>
              <ProjectScene project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
