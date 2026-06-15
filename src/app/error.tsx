"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SegmentError({ error, reset }: Readonly<ErrorProps>) {
  useEffect(() => {
    // Surface the error to logging tools instead of letting it vanish. This is
    // error reporting, not debug noise.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <p className="font-body text-sm font-medium uppercase tracking-widest text-gold-600">
        Error
      </p>
      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">
        Something broke on this page.
      </h1>
      <p className="mt-4 max-w-md font-body text-base text-on-surface-muted">
        This one is on me, not you. Try again, or head back home.
      </p>

      <div className="mt-8 flex items-center gap-6 font-body text-sm font-medium">
        <button
          type="button"
          onClick={reset}
          className="text-gold-600 transition-colors hover:underline"
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-gold-600 transition-colors hover:underline"
        >
          Back home →
        </Link>
      </div>

      {error.digest && (
        <p className="mt-10 font-body text-xs text-on-surface-muted">
          Reference: {error.digest}
        </p>
      )}
    </main>
  );
}
