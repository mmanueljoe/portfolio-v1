import type { ReactNode } from "react";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  /** Hero socials sit at 14.5px, the links in a project's tag row at 14px. */
  size?: "nav" | "link";
}

// A hairline under the text that goes violet with the text on hover. A hover
// only exists one at a time, so this doesn't count against the four-accent rule.
export function TextLink({
  href,
  children,
  external = false,
  size = "link",
}: Readonly<TextLinkProps>) {
  return (
    <a
      href={href}
      className={`border-b border-hairline pb-0.5 font-body transition-colors duration-150 hover:border-accent hover:text-accent ${
        size === "nav"
          ? "text-nav text-on-surface-muted"
          : "text-link text-on-surface"
      }`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}
