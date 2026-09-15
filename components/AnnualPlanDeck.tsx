"use client";

import { useMemo, useState } from "react";
import { PlanCard } from "@/components/PlanCard";
import { PlanCardDetail } from "@/components/PlanCardDetail";
import {
  getDemoPlanActivities,
  type PlanActivity,
} from "@/data/annualPlanData";
import { cn } from "@/lib/utils";
import styles from "./annual-plan.module.css";

type AnnualPlanDeckProps = {
  activities?: PlanActivity[];
  mode?: "embedded" | "page";
  showIntro?: boolean;
};

const ROTATIONS = [-7, 3.5, 8, -4, 6, -9];

export function AnnualPlanDeck({
  activities,
  mode = "embedded",
  showIntro = true,
}: AnnualPlanDeckProps) {
  const deck = useMemo(
    () => (activities && activities.length > 0 ? activities : getDemoPlanActivities()),
    [activities],
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = deck.find((activity) => activity.id === selectedId) ?? null;

  function toggleCard(id: string) {
    setSelectedId((current) => (current === id ? null : id));
  }

  return (
    <section className={cn(styles.section, mode === "page" && styles.pageShell)}>
      {showIntro ? (
        <header className={styles.header}>
          <p className={styles.kicker}>THE HUB</p>
          <h1 className={styles.title}>Pick a Card from The Hub</h1>
          <p className={styles.subtitle}>See what we have planned for the year.</p>
          <p className={styles.note}>
            Every card is one experience we hope to build with you.
          </p>
        </header>
      ) : null}

      <div className={styles.stage}>
        <div className={styles.deck}>
          {deck.map((activity, index) => {
            const isSelected = activity.id === selectedId;
            const receded = Boolean(selectedId) && !isSelected;
            return (
              <div
                key={activity.id}
                className={cn(
                  styles.slot,
                  !selectedId && styles.slotIdle,
                  receded && styles.slotReceded,
                  isSelected && styles.slotSelected,
                )}
                style={{
                  ["--plan-tilt" as string]: `${ROTATIONS[index] ?? 0}deg`,
                  zIndex: isSelected ? 8 : index + 1,
                }}
              >
                <span className={styles.sparkle} />
                <button
                  type="button"
                  className="block w-full cursor-pointer touch-manipulation border-0 bg-transparent p-0 text-left"
                  aria-pressed={isSelected}
                  aria-label={
                    isSelected
                      ? `Close ${activity.title}`
                      : `Draw ${activity.title}`
                  }
                  onClick={() => toggleCard(activity.id)}
                >
                  <PlanCard activity={activity} flipped={isSelected} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selected ? <PlanCardDetail activity={selected} /> : null}

      {selected ? (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.drawButton}
            onClick={() => setSelectedId(null)}
          >
            Draw another card
          </button>
        </div>
      ) : null}
    </section>
  );
}
