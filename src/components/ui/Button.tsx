import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
}

// Default state inverts the surface (bg-on-surface / text-surface) so the button
// stays solid and legible in both light and dark — the literal design spec was
// light-only ink/parchment. Hover lands on the constant gold accent.
export function Button({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-md bg-on-surface px-6 py-3 font-body font-medium text-surface transition-colors duration-200 hover:bg-gold-600 hover:text-ink-900"
    >
      {children}
    </Link>
  );
}
