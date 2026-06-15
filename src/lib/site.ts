const url = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const SITE = {
  url,
  name: "Emmanuel Joe Letsu",
  title: "Emmanuel Joe Letsu · Software Engineer",
  description:
    "Software engineer building full-stack web applications, from the API to the interface.",
  cvPath: "/Emmanuel_Joe_Letsu_CVInternational.pdf",
} as const;
