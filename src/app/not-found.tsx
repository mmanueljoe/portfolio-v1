import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <p className="font-body text-sm font-medium uppercase tracking-widest text-gold-600">
        404
      </p>
      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md font-body text-base text-on-surface-muted">
        The link might be broken, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 font-body text-sm font-medium text-gold-600 transition-colors hover:underline"
      >
        Back home →
      </Link>
    </main>
  );
}
