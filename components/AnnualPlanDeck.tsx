"use client";

import { useMemo, useState } from "react";
import { HubBackButton } from "@/components/HubBackButton";
import { PlanCard } from "@/components/PlanCard";
import { PlanCardDetail } from "@/components/PlanCardDetail";
import {
  annualPlanActivities,
  shuffleActivities,
  type PlanActivity,
} from "@/data/annualPlanData";
import { cn } from "@/lib/utils";
import styles from "./annual-plan.module.css";

type AnnualPlanDeckProps = {
  activities?: PlanActivity[];
  mode?: "embedded" | "page";
  showIntro?: boolean;
  onBack?: () => void;
};

const ROTATIONS = [-7, 3.5, 8, -4, 6, -9];
const FAN_SIZE = 3;

export function AnnualPlanDeck({
  activities,
  mode = "embedded",
  showIntro = true,
  onBack,
}: AnnualPlanDeckProps) {
  const source = useMemo(
    () => (activities && activities.length > 0 ? activities : annualPlanActivities),
    [activities],
  );
  const [order, setOrder] = useState<PlanActivity[]>(() => shuffleActivities(source));
  const [retiredIds, setRetiredIds] = useState<string[]>([]);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [justReshuffled, setJustReshuffled] = useState(false);

  const remaining = useMemo(
    () => order.filter((activity) => !retiredIds.includes(activity.id)),
    [order, retiredIds],
  );
  const fan = remaining.slice(0, FAN_SIZE);
  const selected = remaining.find((activity) => activity.id === selectedId) ?? null;

  function toggleCard(id: string) {
    if (selectedId === id) {
      setSelectedId(null);
      return;
    }
    setSelectedId(id);
    setSeenIds((seen) => (seen.includes(id) ? seen : [...seen, id]));
    setJustReshuffled(false);
  }

  function drawAnother() {
    if (!selectedId) return;
    const nextRetired = retiredIds.includes(selectedId)
      ? retiredIds
      : [...retiredIds, selectedId];
    setSelectedId(null);

    if (nextRetired.length >= source.length) {
      setOrder(shuffleActivities(source));
      setRetiredIds([]);
      setSeenIds([]);
      setJustReshuffled(true);
      return;
    }

    setRetiredIds(nextRetired);
  }

  return (
    <section className={cn(styles.section, mode === "page" && styles.pageShell)}>
      {onBack ? (
        <div className="mx-auto mb-2 w-full max-w-5xl">
          <HubBackButton onBack={onBack} />
        </div>
      ) : null}

      {showIntro ? (
        <header className={styles.header}>
          <p className={styles.kicker}>THE HUB</p>
          <h1 className={styles.title}>Pick a Card from The Hub</h1>
          <p className={styles.subtitle}>See what we have planned for the year.</p>
          <p className={styles.note}>
            Every card is one experience we hope to build with you.
          </p>
          <p className={styles.progress} aria-live="polite">
            {seenIds.length} / {source.length} discovered
            {justReshuffled ? " · the deck has been reshuffled" : ""}
          </p>
        </header>
      ) : null}

      <div className={styles.stage}>
        <div className={cn(styles.deck, fan.length < 3 && styles.deckCentered)}>
          {fan.map((activity, index) => {
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
          <button type="button" className={styles.drawButton} onClick={drawAnother}>
            Draw another card
          </button>
        </div>
      ) : null}
    </section>
  );
}
