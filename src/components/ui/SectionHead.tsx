interface SectionHeadProps {
  title: string;
  /** Mono note on the right. Omitted on About, which has no meta. */
  meta?: string;
  /** Skills sits on the dark band, so its rule and text invert. */
  tone?: "surface" | "alt";
}

// Every section opens the same way: heading, a hairline that eats the remaining
// width, then an optional mono note. The rule above it is 2px on light sections
// and absent on the dark band, where the background change already separates.
export function SectionHead({
  title,
  meta,
  tone = "surface",
}: Readonly<SectionHeadProps>) {
  const isAlt = tone === "alt";

  return (
    <div
      className={`flex flex-wrap items-baseline gap-4 ${
        isAlt ? "" : "border-t-2 border-on-surface pt-5"
      }`}
    >
      <h2
        className={`font-display text-section font-semibold ${
          isAlt ? "text-on-surface-alt" : "text-on-surface"
        }`}
      >
        {title}
      </h2>
      <span
        className={`h-px min-w-7.5 flex-1 ${
          isAlt ? "bg-hairline-alt" : "bg-hairline"
        }`}
        aria-hidden
      />
      {meta && (
        // ink-400 rather than on-surface-alt-muted: the meta sits a step quieter
        // than the values beside it, and reads on both band shades.
        <span
          className={`font-mono text-meta tracking-meta ${
            isAlt ? "text-ink-400" : "text-on-surface-muted"
          }`}
        >
          {meta}
        </span>
      )}
    </div>
  );
}
