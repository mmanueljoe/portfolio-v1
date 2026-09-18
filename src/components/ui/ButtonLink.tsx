import type { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  /** Filled violet, or outlined black that inverts on hover. */
  variant: "primary" | "secondary";
  external?: boolean;
  /** The footer's email button sits slightly larger than the hero pair. */
  size?: "default" | "roomy";
}

const VARIANTS = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary:
    "border border-on-surface text-on-surface hover:bg-on-surface hover:text-surface",
} as const;

export function ButtonLink({
  href,
  children,
  variant,
  external = false,
  size = "default",
}: Readonly<ButtonLinkProps>) {
  return (
    <a
      href={href}
      className={`inline-block rounded-brand font-body text-button font-medium uppercase tracking-tag transition-colors duration-150 ${
        VARIANTS[variant]
      } ${size === "roomy" ? "px-6.5 py-3.75" : "px-6 py-3.5"}`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}
