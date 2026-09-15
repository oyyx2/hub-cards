export type PlanVisualId =
  | "explorer"
  | "sprint"
  | "knowledge"
  | "visit"
  | "problem-night"
  | "social-night"
  | "movie"
  | "archery"
  | "kayak"
  | "closing"
  | "filter";

export type HubPillar = "hear" | "unlock" | "together";
export type PlanTheme = "build" | "community";

export type PlanActivity = {
  id: string;
  title: string;
  timing: string;
  category: string;
  description: string;
  coreIdea: string;
  visual: PlanVisualId;
  pillar: HubPillar;
  theme: PlanTheme;
};

export const annualPlanActivities: PlanActivity[] = [
  {
    id: "ai-explorer",
    title: "AI Explorer Program",
    timing: "Year-round / recurring",
    category: "Explore & Build",
    description:
      "Students explore emerging AI tools, test practical use cases, and contribute short, experience-based notes to a shared AI Knowledge Base. Subject to Program Office approval, selected explorers may receive limited access to paid tools, API credits, or subscriptions.",
    coreIdea: "One student explores. The whole community learns.",
    visual: "explorer",
    pillar: "unlock",
    theme: "build",
  },
  {
    id: "ai-build-sprint",
    title: "AI Build Sprint",
    timing: "Mar–Apr",
    category: "Explore & Build",
    description:
      "Students form small teams around validated student or industry problems and use AI, analytics, and vibe coding tools to create practical prototypes. Alumni and professionals may provide real-world problems and feedback.",
    coreIdea: "Start with a real problem, then build something worth showing.",
    visual: "sprint",
    pillar: "unlock",
    theme: "build",
  },
  {
    id: "knowledge-base",
    title: "Living AI Knowledge Base",
    timing: "Year-round",
    category: "Explore & Build",
    description:
      "A continuously growing archive of tool reviews, workflows, project documentation, failed experiments, and useful lessons contributed by MSBA students. The Knowledge Base will be handed over to future cohorts so they can build on previous exploration rather than starting from zero.",
    coreIdea: "What we learn this year should remain useful next year.",
    visual: "knowledge",
    pillar: "unlock",
    theme: "build",
  },
  {
    id: "company-visit",
    title: "Company Visit Series",
    timing: "Multiple times throughout the year",
    category: "Professional",
    description:
      "Visits to companies across different industries to understand real operations, analytics applications, digital transformation, and emerging business needs.",
    coreIdea: "See how business actually works beyond the classroom.",
    visual: "visit",
    pillar: "unlock",
    theme: "build",
  },
  {
    id: "problem-night",
    title: "Professional & Alumni Problem Night",
    timing: "Feb",
    category: "Professional",
    description:
      "Informal conversations with alumni and industry professionals focused on real business problems, career experience, and how AI and data are used in practice. Useful problems may later become project prompts for student teams.",
    coreIdea:
      "Do not just listen to professionals — build from the problems they actually face.",
    visual: "problem-night",
    pillar: "unlock",
    theme: "build",
  },
  {
    id: "resource-filter",
    title: "The Hub Resource Filter",
    timing: "Year-round",
    category: "Hear You",
    description:
      "A lightweight student-curated layer that filters useful MSBA and HKUST opportunities from the flood of emails and organizes them by relevance, urgency, and student interest.",
    coreIdea: "We do not reduce information. We reduce noise.",
    visual: "filter",
    pillar: "hear",
    theme: "build",
  },
  {
    id: "social-night",
    title: "Entertainment Room Social Night",
    timing: "Nov",
    category: "Community",
    description:
      "A relaxed evening with karaoke, board games, mahjong, and consoles designed to help students meet and socialize outside their usual circles.",
    coreIdea: "Sometimes the best connection starts with doing something fun together.",
    visual: "social-night",
    pillar: "together",
    theme: "community",
  },
  {
    id: "movie-night",
    title: "MSBA Private Movie Night",
    timing: "Jan",
    category: "Community",
    description:
      "A private cinema screening in Hong Kong selected by student vote, creating an easy and low-pressure off-campus social experience.",
    coreIdea: "A simple reason to show up and spend time together.",
    visual: "movie",
    pillar: "together",
    theme: "community",
  },
  {
    id: "archery",
    title: "Archery Experience",
    timing: "Mar",
    category: "Community",
    description:
      "A beginner-friendly archery session at a certified facility with professional instruction, combining a novel recreational activity with informal cohort bonding.",
    coreIdea: "Try something new together.",
    visual: "archery",
    pillar: "together",
    theme: "community",
  },
  {
    id: "kayaking-bbq",
    title: "Kayaking + BBQ",
    timing: "May",
    category: "Community",
    description:
      "A beginner-friendly outdoor kayaking experience followed by a casual BBQ gathering, combining outdoor activity with a relaxed social setting.",
    coreIdea: "Get outside, do something different, and spend time together.",
    visual: "kayak",
    pillar: "together",
    theme: "community",
  },
  {
    id: "closing-night",
    title: "The Hub Closing Night",
    timing: "Jun",
    category: "Demo / Community",
    description:
      "A year-end evening combining AI project showcases, alumni and professional networking, and a relaxed social celebration. Projects and lessons from the year will be added back into the Knowledge Base.",
    coreIdea: "Demo. Connect. Celebrate.",
    visual: "closing",
    pillar: "together",
    theme: "community",
  },
];

export const demoPlanIds = ["ai-explorer", "archery", "kayaking-bbq"] as const;

export function getPlanActivitiesByIds(ids: readonly string[]) {
  return ids
    .map((id) => annualPlanActivities.find((activity) => activity.id === id))
    .filter((activity): activity is PlanActivity => Boolean(activity));
}

export function getDemoPlanActivities() {
  return getPlanActivitiesByIds(demoPlanIds);
}

export function shuffleActivities(activities: PlanActivity[]) {
  const next = [...activities];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j]!, next[i]!];
  }
  return next;
}
