"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { TextLink } from "@/components/ui/TextLink";
import { SITE } from "@/lib/site";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mmanueljoe", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mmanueljoe/",
    external: true,
  },
  { label: "Email", href: "mailto:emmanuelletsu18@gmail.com", external: false },
];

export function HeroSection() {
  return (
    <section className="px-gutter pt-hero-top pb-hero-bottom">
      <Stagger className="mx-auto w-full max-w-page">
        <StaggerItem>
          <span className="font-mono text-meta tracking-eyebrow text-on-surface-muted">
            EMMANUEL JOE LETSU, SOFTWARE ENGINEER, ACCRA
          </span>
        </StaggerItem>

        <StaggerItem>
          <h1 className="mt-5.5 max-w-hero-head font-display text-hero font-bold text-on-surface">
            I build software the way I&apos;d want to inherit it
            <span className="text-accent">.</span>
          </h1>
        </StaggerItem>

        <StaggerItem className="mt-hero-row grid grid-pair-hero items-end gap-pair-col">
          <p className="max-w-hero-lede font-body text-lede text-on-surface-muted">
            Full stack, from the API to the interface. I care about the parts
            nobody sees, because that&apos;s usually where the trouble starts.
          </p>

          <div className="grid gap-5.5">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/#work" variant="primary">
                See the work
              </ButtonLink>
              <ButtonLink href={SITE.cvPath} variant="secondary" external>
                Download CV
              </ButtonLink>
            </div>

            <div className="flex flex-wrap gap-4.5">
              {SOCIALS.map((social) => (
                <TextLink
                  key={social.label}
                  href={social.href}
                  external={social.external}
                  size="nav"
                >
                  {social.label}
                </TextLink>
              ))}
            </div>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
