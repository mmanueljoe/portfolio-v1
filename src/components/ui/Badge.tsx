import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

// The dot is black, not violet. The brand allows four violet elements per page
// and they are already spent on the two wordmark stops, the hero headline stop
// and the primary button.
export function Badge({ children }: Readonly<BadgeProps>) {
  return (
    <span className="inline-flex items-center gap-2 rounded-brand border border-hairline px-3 py-1.75">
      <span className="h-1.5 w-1.5 rounded-full bg-on-surface" aria-hidden />
      <span className="font-mono text-tag tracking-pill text-on-surface-muted">
        {children}
      </span>
    </span>
  );
}
