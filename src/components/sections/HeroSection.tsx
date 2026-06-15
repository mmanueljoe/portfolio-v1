"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { SITE } from "@/lib/site";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mmanueljoe", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mmanueljoe/",
    external: true,
  },
  { label: "Email", href: "mailto:emmanuelletsu18@gmail.com", external: false },
  { label: "CV", href: SITE.cvPath, external: true },
];

export function HeroSection() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-surface">
      <Stagger className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <StaggerItem>
          <Badge>Open to work</Badge>
        </StaggerItem>

        <StaggerItem>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-on-surface sm:text-5xl md:text-6xl">
            Emmanuel Joe Letsu
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-4 font-body text-lg text-on-surface-muted">
            Software Engineer
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-4 max-w-xl font-body text-base font-light text-on-surface-muted">
            I build full-stack web applications that are well-engineered and
            considered, from the API to the interface.
          </p>
        </StaggerItem>

        <StaggerItem>
          <Link
            href="/#projects"
            className="mt-8 inline-block font-body text-sm font-medium text-gold-600 transition-colors hover:underline"
          >
            View my work →
          </Link>
        </StaggerItem>

        <StaggerItem className="mt-8 flex items-center justify-center gap-4 font-body text-sm">
          {SOCIALS.map((social, index) => (
            <span key={social.label} className="flex items-center gap-4">
              {index > 0 && (
                <span className="text-on-surface-muted" aria-hidden>
                  ·
                </span>
              )}
              <a
                href={social.href}
                className="text-gold-600 transition-colors hover:underline"
                {...(social.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {social.label}
              </a>
            </span>
          ))}
        </StaggerItem>
      </Stagger>
    </section>
  );
}
