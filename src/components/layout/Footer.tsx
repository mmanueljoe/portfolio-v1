const FOOTER_LINKS = [
  { label: "GitHub", href: "https://github.com/mmanueljoe", external: true },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/emmanuel-letsu",
    external: true,
  },
  { label: "Email", href: "mailto:emmanuelletsu18@gmail.com", external: false },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-on-surface/10 bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="font-body text-sm text-on-surface-muted">
          © {year} Emmanuel Joe Letsu
        </p>
        <div className="flex items-center gap-4 font-body text-sm">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-muted transition-colors hover:text-gold-600"
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
    </footer>
  );
}
