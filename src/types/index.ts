export interface ProjectFact {
  term: string;
  value: string;
}

export interface Project {
  /** Sits after the entry number: "01 / PROFESSIONAL". */
  kicker: string;
  title: string;
  /** Exactly two paragraphs — the layout is designed around that count. */
  body: [string, string];
  facts: ProjectFact[];
  stack: string[];
  repoHref?: string;
  writeupHref?: string;
  imageSrc: string;
  imageAlt: string;
}
