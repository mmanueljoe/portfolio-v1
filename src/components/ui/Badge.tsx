import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: Readonly<BadgeProps>) {
  return (
    <span className="inline-flex items-center gap-2 font-body text-xs font-medium text-gold-600">
      <span className="h-2 w-2 rounded-full bg-gold-600 animate-pulse" />
      {children}
    </span>
  );
}
