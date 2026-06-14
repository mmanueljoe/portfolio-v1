import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    title: "Earned Wage Access",
    kicker: "Fintech",
    line: "Access to wages already earned, before payday. Over USSD for basic phones, with an employer dashboard and an AI payslip processor.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Moolre API"],
    meta: "In active development",
  },
  {
    title: "Resource Management",
    kicker: "Platform",
    line: "Staffing and allocation for a tech-services company across markets. I built the AI staff-matching interface and the analytics dashboard.",
    stack: ["React", "TypeScript", "Node.js", "REST APIs"],
    meta: "Professional contribution",
  },
  {
    title: "Kanban Task Manager",
    kicker: "Experiment",
    line: "One board, built three times (Context, then Redux, then Zustand) to feel the state-management tradeoffs first-hand.",
    stack: ["React", "TypeScript", "Zustand"],
    meta: "Personal project",
    repoHref: "https://github.com/mmanueljoe/kanban-task-manager-zustand",
  },
];
