import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SITE } from "@/lib/site";

const CONTACTS = [
  {
    label: "emmanuelletsu18@gmail.com",
    href: "mailto:emmanuelletsu18@gmail.com",
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/mmanueljoe",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mmanueljoe/",
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-surface py-24">
      <Reveal className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-on-surface">
          Get in touch
        </h2>
        <p className="mt-4 max-w-md font-body text-base text-on-surface-muted">
          I'm open to full-stack engineering roles, interesting products, and
          problems worth solving. Remote or Ghana-based. Reach out directly.
        </p>
        <div className="mt-8 flex flex-col gap-2 font-body text-base">
          {CONTACTS.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              className="text-gold-600 transition-colors hover:underline"
              {...(contact.external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              {contact.label}
            </a>
          ))}
        </div>
        <a
          href={SITE.cvPath}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-md bg-on-surface px-6 py-3 font-body text-sm font-medium text-surface transition-colors hover:bg-gold-600 hover:text-parchment-100"
        >
          Download CV
        </a>
      </Reveal>
    </section>
  );
}
