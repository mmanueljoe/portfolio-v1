// Single source of truth for absolute-URL metadata (Open Graph tags, sitemap,
// robots). No domain is registered yet, so `url` is a placeholder. When the real
// domain goes live, change this one value and everything downstream follows.
export const SITE = {
  url: "https://emmanueljoebenson.com",
  name: "Emmanuel Joe Letsu",
  title: "Emmanuel Joe Letsu · Software Engineer",
  description:
    "Software engineer building full-stack web applications, from the API to the interface.",
  // CV lives in /public; referenced from the nav and the contact section.
  cvPath: "/Emmanuel_Joe_Letsu_CVInternational.pdf",
} as const;
