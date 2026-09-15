import { AnnualPlanDeck } from "@/components/AnnualPlanDeck";

export const metadata = {
  title: "Pick a Card from The Hub",
  description: "See what we have planned for the year.",
};

export default function PlanDemoPage() {
  return <AnnualPlanDeck mode="page" />;
}
