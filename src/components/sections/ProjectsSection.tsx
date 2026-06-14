import { ProjectScene } from "@/components/sections/ProjectScene";
import { PROJECTS } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-surface py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="text-center font-body text-xs font-medium uppercase tracking-widest text-gold-600">
          Selected Work
        </p>

        <div className="mt-16 flex flex-col gap-24">
          {PROJECTS.map((project, index) => (
            <ProjectScene key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
