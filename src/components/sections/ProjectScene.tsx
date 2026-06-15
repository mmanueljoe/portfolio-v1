"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { Project } from "@/types";

interface ProjectSceneProps {
  project: Project;
  index: number;
}

export function ProjectScene({ project, index }: Readonly<ProjectSceneProps>) {
  const { title, kicker, line, stack, meta, repoHref, liveHref, mockupSrc } =
    project;
  const number = String(index + 1).padStart(2, "0");
  const projectHref = liveHref ?? repoHref;
  const reduceMotion = useReducedMotion();
  const lift = reduceMotion ? undefined : { y: -6 };

  return (
    <article className="flex flex-col items-center text-center">
      <p className="font-display text-xs font-medium uppercase tracking-widest text-gold-600">
        {number} · {kicker}
      </p>
      <h3 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
        {title}
      </h3>
      <p className="mt-4 max-w-xl font-body text-lg font-light text-on-surface-muted">
        {line}
      </p>
      <p className="mt-4 font-body text-sm text-on-surface-muted">
        {stack.join(" · ")}
      </p>

      <motion.div
        className="mt-10 w-full max-w-3xl"
        whileHover={lift}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {mockupSrc ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-on-surface/10 bg-surface-alt shadow-sm transition-shadow hover:shadow-xl">
            <Image
              src={mockupSrc}
              alt={`${title} preview`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-on-surface/10 bg-surface-alt shadow-sm transition-shadow hover:shadow-xl">
            <span className="font-body text-xs text-on-surface-alt-muted">
              {title} · mockup
            </span>
          </div>
        )}
      </motion.div>

      <div className="mt-6 flex items-center gap-4 font-body text-sm">
        {meta && <span className="text-on-surface-muted">{meta}</span>}
        {projectHref && (
          <a
            href={projectHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-600 transition-colors hover:underline"
          >
            View project →
          </a>
        )}
      </div>
    </article>
  );
}
