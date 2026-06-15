interface PostHeaderProps {
  title: string;
  date: string;
  readingTime: number;
}

export function PostHeader({ title, date, readingTime }: PostHeaderProps) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex flex-col gap-3">
      <h1 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
        {title}
      </h1>
      <p className="font-body text-sm text-on-surface-muted">
        <time dateTime={date}>{formatted}</time> · {readingTime} min read
      </p>
    </header>
  );
}
