"use client";

import { displayWord } from "@/lib/word";
import styles from "./vine.module.css";

type LeafPopoverProps = {
  word: string;
  createdAt: string;
  leftPercent: number;
  topPercent: number;
  placement: "above" | "below";
  onClose: () => void;
};

function formatAdded(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function LeafPopover({
  word,
  createdAt,
  leftPercent,
  topPercent,
  placement,
  onClose,
}: LeafPopoverProps) {
  const added = formatAdded(createdAt);

  return (
    <div
      className={`${styles.popover} ${placement === "below" ? styles.popoverBelow : ""}`}
      role="dialog"
      aria-label={displayWord(word)}
      style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
    >
      <p className={styles.popoverWord}>{displayWord(word)}</p>
      <p className={styles.popoverMeta}>Added to The Hub</p>
      {added ? <p className={styles.popoverMeta}>{added}</p> : null}
      <button type="button" className={styles.close} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
