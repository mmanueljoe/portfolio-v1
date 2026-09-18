import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import type { Project } from "@/types";

interface ProjectEntryProps {
  project: Project;
  index: number;
}

export function ProjectEntry({ project, index }: Readonly<ProjectEntryProps>) {
  const { kicker, title, body, facts, stack, repoHref, writeupHref } = project;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="grid grid-pair-entry items-start gap-entry-col">
      {/* contain, not cover: the screenshots have different aspect ratios and
          cover was cropping them badly. */}
      <div className="relative aspect-shot overflow-hidden rounded-brand border border-hairline bg-shot-bed">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          className="object-contain"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div>
        <p className="mb-3 font-mono text-meta tracking-kicker text-on-surface-muted">
          {number} &nbsp;/&nbsp; {kicker}
        </p>
        <h3 className="mb-3.5 font-display text-project font-semibold text-on-surface">
          {title}
        </h3>

        {body.map((paragraph, paragraphIndex) => (
          <p
            key={paragraph}
            className={`max-w-prose font-body text-body text-on-surface-muted ${
              paragraphIndex === body.length - 1 ? "mb-5" : "mb-4"
            }`}
          >
            {paragraph}
          </p>
        ))}

        <dl className="mb-5.5 grid gap-3">
          {facts.map((fact) => (
            <div
              key={fact.term}
              className="grid grid-facts items-baseline gap-4"
            >
              <dt className="font-mono text-tag tracking-meta text-on-surface-muted">
                {fact.term}
              </dt>
              <dd className="font-body text-fact text-on-surface">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-2.5">
          {stack.map((tag) => (
            <span
              key={tag}
              className="rounded-brand border border-hairline px-2.5 py-1.25 font-mono text-tag tracking-tag text-on-surface-muted"
            >
              {tag}
            </span>
          ))}
          {repoHref && (
            <TextLink href={repoHref} external>
              Repository
            </TextLink>
          )}
          {writeupHref && <TextLink href={writeupHref}>The write-up</TextLink>}
        </div>
      </div>
    </article>
  );
}
