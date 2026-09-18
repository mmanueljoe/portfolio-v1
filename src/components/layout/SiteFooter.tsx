import { ButtonLink } from "@/components/ui/ButtonLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { SITE } from "@/lib/site";

const EMAIL = "emmanuelletsu18@gmail.com";

const ELSEWHERE = [
  { label: "GitHub", href: "https://github.com/mmanueljoe", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mmanueljoe/",
    external: true,
  },
  { label: "CV, PDF", href: SITE.cvPath, external: true },
];

// The footer is the contact section — there is no separate ContactSection. It
// lives in the root layout, so /blog gets the same close.
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="border-t-2 border-on-surface px-gutter pt-footer-top pb-11"
    >
      <div className="mx-auto w-full max-w-page">
        <div className="grid grid-pair-contact items-start gap-footer-col">
          <div>
            <h2 className="mb-4.5 font-display text-footer-head font-bold text-on-surface">
              Tell me what&apos;s broken.
            </h2>
            <p className="mb-6.5 max-w-footer-lede font-body text-footer-lede text-on-surface-muted">
              I&apos;m open to full-stack engineering roles, interesting
              products, and problems worth solving. Remote or Ghana-based. Write
              to me directly.
            </p>
            <ButtonLink
              href={`mailto:${EMAIL}`}
              variant="secondary"
              size="roomy"
            >
              {EMAIL}
            </ButtonLink>
          </div>

          <div className="grid gap-6.5">
            <div>
              <p className="mb-3 font-mono text-tag tracking-meta text-on-surface-muted">
                ELSEWHERE
              </p>
              <div className="grid gap-2.25">
                {ELSEWHERE.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="justify-self-start font-body text-where text-on-surface transition-colors duration-150 hover:text-accent"
                    {...(link.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 font-mono text-tag tracking-meta text-on-surface-muted">
                WHERE
              </p>
              <p className="font-body text-where text-on-surface-muted">
                Accra, Ghana. GMT, and comfortable with European and US hours.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-bottom-bar flex flex-wrap items-center justify-between gap-5 border-t border-hairline pt-5.5">
          <Wordmark size="footer" />
          <span className="font-mono text-meta tracking-pill text-on-surface-muted">
            © {year} EMMANUEL JOE LETSU
          </span>
        </div>
      </div>
    </footer>
  );
}
