import { CardBack } from "@/components/CardBack";
import { PlanIllustration } from "@/components/PlanIllustration";
import type { PlanActivity } from "@/data/annualPlanData";
import { cn } from "@/lib/utils";
import styles from "./annual-plan.module.css";

type PlanCardProps = {
  activity: PlanActivity;
  flipped?: boolean;
};

export function PlanCard({ activity, flipped = false }: PlanCardProps) {
  return (
    <div className={cn(styles.card, flipped && styles.flipped)}>
      <div className={cn(styles.cardFace, styles.cardBack)}>
        <CardBack />
      </div>
      <div className={cn(styles.cardFace, styles.cardFront)}>
        <article className="relative h-full overflow-hidden rounded-[1.05rem] border border-[#c6a46a]/70 bg-[#efe3cb] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-[8px] overflow-hidden rounded-[0.8rem] border border-[#243528]/20">
            <div className="h-[68%]">
              <PlanIllustration visual={activity.visual} />
            </div>
            <svg
              className="pointer-events-none absolute inset-1 z-10 h-[calc(100%-8px)] w-[calc(100%-8px)]"
              viewBox="0 0 100 150"
              aria-hidden="true"
            >
              <path
                d="M8 22 C8 10, 18 8, 24 8 M8 128 C8 140, 18 142, 24 142 M76 8 C88 8, 92 14, 92 22 M76 142 C88 142, 92 136, 92 128"
                fill="none"
                stroke="#7a5a28"
                strokeOpacity="0.55"
                strokeWidth="1.1"
              />
            </svg>
            <div className="absolute inset-x-0 bottom-0 bg-[#f4ead6] px-3 pb-3 pt-4 text-center">
              <p className="font-heading text-[1.02rem] leading-tight text-[#1a1408]">
                {activity.title}
              </p>
              <p className="mt-1 text-[0.68rem] tracking-[0.22em] text-[#7a5a28]">
                {activity.timing}
              </p>
              <p className="mt-1 text-[0.62rem] tracking-[0.16em] text-[#314232]">
                {activity.category}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
