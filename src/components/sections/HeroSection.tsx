import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mmanueljoe", external: true },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/emmanuel-letsu",
    external: true,
  },
  { label: "Email", href: "mailto:emmanuelletsu18@gmail.com", external: false },
];

export function HeroSection() {
  return (
    <section className="flex min-h-screen items-center bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <Badge>Open to work</Badge>

          <div className="flex flex-col gap-3">
            <h1 className="font-display text-4xl font-bold leading-tight text-on-surface sm:text-5xl md:text-6xl">
              Emmanuel Joe Benson
            </h1>
            <p className="font-body text-lg text-on-surface-muted">
              Software Engineer
            </p>
            <p className="max-w-xl font-body text-base font-light text-on-surface-muted">
              I build full-stack web applications that are well-engineered and
              considered, from the API to the interface.
            </p>
          </div>

          <Button href="/#projects">View my work →</Button>

          <div className="flex items-center gap-4 font-body text-sm">
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
          </div>
        </div>
      </div>
    </section>
  );
}
