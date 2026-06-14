import { ProjectScene } from "@/components/sections/ProjectScene";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PROJECTS } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-surface py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionLabel>Selected Work</SectionLabel>

        <div className="mt-16 flex flex-col gap-24">
          {PROJECTS.map((project, index) => (
            <ProjectScene key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
