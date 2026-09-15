export type PlanVisualId =
  | "explorer"
  | "sprint"
  | "visit"
  | "problem-night"
  | "social-night"
  | "movie"
  | "archery"
  | "kayak"
  | "closing";

export type PlanActivity = {
  id: string;
  title: string;
  timing: string;
  category: string;
  description: string;
  visual: PlanVisualId;
};

export const annualPlanActivities: PlanActivity[] = [
  {
    id: "ai-explorer",
    title: "AI Explorer Program",
    timing: "Year-round",
    category: "Explore & Build",
    description:
      "Students explore emerging AI tools, test real use cases, and contribute practical findings to a shared AI Knowledge Base.",
    visual: "explorer",
  },
  {
    id: "ai-build-sprint",
    title: "AI Build Sprint",
    timing: "Mar–Apr",
    category: "Explore & Build",
    description:
      "Small teams build practical AI prototypes around validated student or industry problems, with feedback from alumni and professionals.",
    visual: "sprint",
  },
  {
    id: "company-visit",
    title: "Company Visit Series",
    timing: "Throughout the year",
    category: "Professional",
    description:
      "Visits to companies across different industries to understand real operations, analytics applications, and emerging business needs.",
    visual: "visit",
  },
  {
    id: "problem-night",
    title: "Professional & Alumni Problem Night",
    timing: "Feb",
    category: "Professional",
    description:
      "Informal conversations with alumni and industry professionals focused on real business problems, career experience, and how AI and data are used in practice.",
    visual: "problem-night",
  },
  {
    id: "social-night",
    title: "Entertainment Room Social Night",
    timing: "Nov",
    category: "Community",
    description:
      "A relaxed evening with karaoke, board games, mahjong and consoles designed to help students meet outside their usual circles.",
    visual: "social-night",
  },
  {
    id: "movie-night",
    title: "Private Movie Night",
    timing: "Jan",
    category: "Community",
    description:
      "A private cinema screening selected by student vote for an easy, low-pressure off-campus social experience.",
    visual: "movie",
  },
  {
    id: "archery",
    title: "Archery Experience",
    timing: "Mar",
    category: "Community",
    description:
      "A beginner-friendly archery session with professional instruction, combining a novel activity with informal cohort bonding.",
    visual: "archery",
  },
  {
    id: "kayaking-bbq",
    title: "Kayaking + BBQ",
    timing: "May",
    category: "Community",
    description:
      "A beginner-friendly outdoor kayaking experience followed by a casual BBQ gathering.",
    visual: "kayak",
  },
  {
    id: "closing-night",
    title: "The Hub Closing Night",
    timing: "Jun",
    category: "Demo / Community",
    description:
      "A year-end evening combining AI project showcases, alumni and professional networking, and a relaxed social celebration.",
    visual: "closing",
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
