import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export function PostCard({ slug, title, date, description }: PostCardProps) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      <Link href={`/blog/${slug}`} className="group block">
        <time
          dateTime={date}
          className="font-body text-sm text-on-surface-muted"
        >
          {formatted}
        </time>
        <h2 className="mt-1 font-display text-xl font-semibold text-on-surface transition-colors group-hover:text-gold-600">
          {title}
        </h2>
        <p className="mt-2 font-body text-base text-on-surface-muted">
          {description}
        </p>
      </Link>
    </article>
  );
}
