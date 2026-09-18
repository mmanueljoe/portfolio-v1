import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
}

// 2026-06-10 → 2026.06.10. Formatted off the raw frontmatter string rather than
// a Date, so the displayed day can't drift by a timezone.
function formatDate(date: string): string {
  return date.slice(0, 10).replaceAll("-", ".");
}

export function PostCard({
  slug,
  title,
  date,
  description,
}: Readonly<PostCardProps>) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="grid grid-pair-post items-baseline gap-x-6 gap-y-3 border-b border-hairline px-1 py-6.5 transition-colors duration-150 hover:bg-row-hover"
    >
      <div>
        <time
          dateTime={date}
          className="mb-2 block font-mono text-date text-on-surface-muted"
        >
          {formatDate(date)}
        </time>
        <span className="block font-display text-post-title font-medium text-on-surface">
          {title}
        </span>
      </div>
      <p className="max-w-post-desc font-body text-post-desc text-on-surface-muted">
        {description}
      </p>
    </Link>
  );
}
