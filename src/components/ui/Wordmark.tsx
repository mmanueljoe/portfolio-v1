interface WordmarkProps {
  /** Nav renders at 22px, the footer bottom bar at 17px. */
  size: "nav" | "footer";
}

// The full stop after "Joe" is one of the four violet elements the brand allows
// on a page. It is never dropped and never recoloured.
export function Wordmark({ size }: Readonly<WordmarkProps>) {
  return (
    <span
      className={`font-display font-bold text-on-surface ${
        size === "nav" ? "text-wordmark" : "text-wordmark-sm"
      }`}
    >
      Joe<span className="text-accent">.</span>
    </span>
  );
}
