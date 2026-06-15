"use client";

import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

// global-error replaces the root layout when the layout itself throws, so the
// fonts wired up in layout.tsx are gone. Re-declare them here so this last-resort
// screen still reads in the brand type rather than a bare system font.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({
  error,
  reset,
}: Readonly<GlobalErrorProps>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} antialiased`}
    >
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">
            Something broke.
          </h1>
          <p className="mt-4 max-w-md font-body text-base text-on-surface-muted">
            The page failed to load. Reload to try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 font-body text-sm font-medium text-gold-600 transition-colors hover:underline"
          >
            Reload
          </button>
          {error.digest && (
            <p className="mt-10 font-body text-xs text-on-surface-muted">
              Reference: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
