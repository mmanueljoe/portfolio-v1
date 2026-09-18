import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Wordmark } from "@/components/ui/Wordmark";
import { NAV_LINKS } from "@/lib/nav";

// A flat bar, not the old floating pill. It wraps rather than collapsing into a
// drawer, which is why there's no open/close state here and no "use client".
export function Nav() {
  return (
    <header className="border-b border-hairline px-gutter">
      <div className="mx-auto flex w-full max-w-page flex-wrap items-center justify-between gap-6 py-5">
        <Link href="/" aria-label="Home">
          <Wordmark size="nav" />
        </Link>

        <nav className="flex flex-wrap items-center gap-nav-gap">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-nav text-on-surface-muted transition-colors duration-150 hover:text-on-surface"
            >
              {link.label}
            </Link>
          ))}
          <Badge>OPEN TO WORK</Badge>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
