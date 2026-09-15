"use client";

import { useMemo, useState } from "react";
import { LeafPopover } from "@/components/LeafPopover";
import { VineSegment } from "@/components/VineSegment";
import type { HubCard } from "@/lib/types";
import { layoutVine } from "@/lib/vineLayout";
import styles from "./vine.module.css";

type GrowingVineProps = {
  cards: HubCard[];
  growingId?: string | null;
  highlightId?: string | null;
  selectedId?: string | null;
  onSelect: (card: HubCard) => void;
  onClose: () => void;
};

export function GrowingVine({
  cards,
  growingId = null,
  highlightId = null,
  selectedId = null,
  onSelect,
  onClose,
}: GrowingVineProps) {
  const layout = useMemo(() => layoutVine(cards), [cards]);
  const [liftedId, setLiftedId] = useState<string | null>(null);
  const selected = layout.leaves.find((leaf) => leaf.card.id === selectedId);

  return (
    <div className={styles.stage}>
      <svg
        className={styles.canvas}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        role="img"
        aria-label="A growing vine of anonymous words from The Hub"
      >
        <path className={styles.stemShadow} d={layout.stemPath} />
        <path className={styles.stem} d={layout.stemPath} />
        {layout.leaves.map((leaf) => (
          <VineSegment
            key={leaf.card.id}
            leaf={leaf}
            growing={leaf.card.id === growingId}
            lifted={
              leaf.card.id !== growingId &&
              (leaf.card.id === liftedId ||
                leaf.card.id === highlightId ||
                leaf.card.id === selectedId)
            }
          />
        ))}
        <circle className={styles.bud} cx={layout.tipX} cy={layout.tipY} r={cards.length === 0 ? 5.2 : 3.1} />
      </svg>

      {layout.leaves.map((leaf) => (
        <button
          key={leaf.card.id}
          type="button"
          className={styles.hit}
          style={{
            left: `${(leaf.attachX / layout.width) * 100}%`,
            top: `${(leaf.attachY / layout.height) * 100}%`,
          }}
          aria-label="Reveal word"
          aria-haspopup="dialog"
          aria-expanded={selectedId === leaf.card.id}
          data-leaf-id={leaf.card.id}
          onClick={() => {
            if (selectedId === leaf.card.id) onClose();
            else onSelect(leaf.card);
          }}
          onMouseEnter={() => setLiftedId(leaf.card.id)}
          onMouseLeave={() => setLiftedId((current) => (current === leaf.card.id ? null : current))}
          onFocus={() => setLiftedId(leaf.card.id)}
          onBlur={() => setLiftedId((current) => (current === leaf.card.id ? null : current))}
        />
      ))}

      {selected ? (
        <LeafPopover
          word={selected.card.word}
          createdAt={selected.card.created_at}
          leftPercent={Math.min(78, Math.max(22, (selected.attachX / layout.width) * 100))}
          topPercent={(selected.attachY / layout.height) * 100}
          placement={selected.attachY < 72 ? "below" : "above"}
          onClose={onClose}
        />
      ) : null}

      {layout.leaves.length === 0 ? (
        <p className={styles.invite}>Every vine starts somewhere.</p>
      ) : null}
    </div>
  );
}
