import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
}

export function SectionLabel({ children }: Readonly<SectionLabelProps>) {
  return (
    <p className="text-center font-body text-xs font-medium uppercase tracking-widest text-gold-600">
      {children}
    </p>
  );
}
