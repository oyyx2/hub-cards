import type { PlanActivity } from "@/data/annualPlanData";
import styles from "./annual-plan.module.css";

type PlanCardDetailProps = {
  activity: PlanActivity;
};

export function PlanCardDetail({ activity }: PlanCardDetailProps) {
  return (
    <div className={styles.detail}>
      <p className={styles.detailCategory}>{activity.category}</p>
      <h2 className={styles.detailTitle}>{activity.title}</h2>
      <p className={styles.detailTiming}>{activity.timing}</p>
      <p className={styles.detailCopy}>{activity.description}</p>
    </div>
  );
}
