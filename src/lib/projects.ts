import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    kicker: "PROFESSIONAL",
    title: "Putting the right person on the right project",
    body: [
      "An internal platform at AmaliTech for tracking clients, projects, skills and staffing across several markets. Hundreds of live projects, each needing people with the right skills who are not already committed somewhere else.",
      "I built the AI recommender screen, where a manager describes what a project needs and gets ranked candidates back, and the analytics dashboard the leads use to see where capacity actually sits.",
    ],
    facts: [
      {
        term: "MY PART",
        value: "Staff matching interface and the analytics dashboard.",
      },
      {
        term: "THE HARD BIT",
        value:
          "A ranked suggestion is only useful if the manager can see why it ranked. The interface has to show its reasoning.",
      },
    ],
    stack: ["VUE 3", "TYPESCRIPT", "NODE.JS", "GRAPHQL"],
    imageSrc: "/images/projects/rms.png",
    imageAlt: "The project manager view of the AmaliTech resource platform",
  },
  {
    kicker: "TEAM PRODUCT",
    title: "Ping, a notice board for a neighbourhood",
    body: [
      "The thing a street WhatsApp group keeps failing to be. Residents post news, events, discussions and alerts, neighbours comment, and anyone can search the archive or narrow it to a date range, so a lost dog from March does not sit on top of tomorrow's power cut.",
      "Six of us built it, one per discipline. I owned the frontend: every screen, the auth flow, posting and commenting, the filters, and the analytics dashboard drawn from the data team's pipeline. It runs on AWS behind a pipeline that tests and deploys on merge.",
    ],
    facts: [
      {
        term: "MY ROLE",
        value:
          "Frontend, sole owner, against a Spring Boot API I did not write.",
      },
      {
        term: "WHAT I LEARNT",
        value:
          "Working to somebody else's contract makes you read the documentation properly and ask better questions early.",
      },
    ],
    stack: ["REACT 18", "TYPESCRIPT", "VITE", "CHART.JS", "SPRING BOOT API"],
    repoHref:
      "https://github.com/AmaliTech-Training-Academy/communityboard-team-3",
    imageSrc: "/images/projects/ping-home.png",
    imageAlt: "The Ping post feed",
  },
  {
    kicker: "ON PURPOSE",
    title: "The same board, three times",
    body: [
      "I built one kanban board three times over: Context, then Redux, then Zustand. Same features, same components. The only thing that changed each time was how state moved through the app.",
      "It is one thing to read that Context re-renders every consumer. It is another to watch the whole board flicker while you drag a single card.",
    ],
    facts: [
      {
        term: "FINDING",
        value:
          "Zustand for this shape of problem. Not because it wins, because it fit.",
      },
      {
        term: "WHY IT IS HERE",
        value:
          "Tradeoffs you have only read about stay abstract. The ones you have lived become judgement.",
      },
    ],
    stack: ["REACT", "TYPESCRIPT", "ZUSTAND"],
    repoHref: "https://github.com/mmanueljoe/kanban-task-manager-zustand",
    writeupHref: "/#writing",
    imageSrc: "/images/projects/kanban.png",
    imageAlt: "The kanban board",
  },
];
