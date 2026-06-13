"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS } from "@/lib/nav";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Glass only once scrolled: surface at 80% + blur + hairline border. The
  // surface tints carry the theme, so this reads in both light and dark (ADR-008).
  const surfaceClasses = scrolled
    ? "backdrop-blur bg-parchment-200/80 dark:bg-ink-900/80 border-b border-ink-100 dark:border-ink-800"
    : "border-b border-transparent";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${surfaceClasses}`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-base font-semibold text-on-surface"
        >
          Emmanuel Joe Benson
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm font-medium text-on-surface-muted transition-colors duration-150 hover:text-on-surface"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="text-on-surface md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
