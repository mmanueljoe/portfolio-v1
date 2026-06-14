import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
}

// The gold eyebrow above every section. Centered, so all section labels sit on
// the same spine — one component so they can't drift apart.
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-center font-body text-xs font-medium uppercase tracking-widest text-gold-600">
      {children}
    </p>
  );
}
