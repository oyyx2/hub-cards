"use client";

import { useEffect, useRef, useState } from "react";
import { GrowingVine } from "@/components/GrowingVine";
import { HubBackButton } from "@/components/HubBackButton";
import { VineWordInput } from "@/components/VineWordInput";
import { fetchCards, insertCard, isSupabaseConfigured, subscribeToCards } from "@/lib/supabase";
import { makeSeed } from "@/lib/seed";
import { markSubmitted } from "@/lib/word";
import { VINE_DISPLAY_LIMIT } from "@/lib/vineLayout";
import type { HubCard } from "@/lib/types";
import styles from "./vine.module.css";

type VineExperienceProps = {
  onBack?: () => void;
};

export function VineExperience({ onBack }: VineExperienceProps) {
  const [cards, setCards] = useState<HubCard[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selected, setSelected] = useState<HubCard | null>(null);
  const [growingId, setGrowingId] = useState<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const seenIds = useRef<Set<string> | null>(null);
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const next = await fetchCards();
        if (cancelled) return;
        seenIds.current = new Set(next.map((card) => card.id));
        setCards(next);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return subscribeToCards((incoming) => {
      setCards((current) => {
        if (current.some((card) => card.id === incoming.id)) return current;
        return [incoming, ...current];
      });
    });
  }, []);

  useEffect(() => {
    if (status !== "ready") return;
    const known = seenIds.current;
    const ids = new Set(cards.map((card) => card.id));
    if (known) {
      for (const id of ids) {
        if (!known.has(id)) {
          setGrowingId(id);
          window.setTimeout(() => setGrowingId((current) => (current === id ? null : current)), 1400);
          break;
        }
      }
    }
    seenIds.current = ids;
  }, [cards, status]);

  useEffect(() => {
    if (!highlightId) return;
    const node = scrollRef.current?.querySelector(`[data-leaf-id="${highlightId}"]`);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [highlightId, cards]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function handleSubmit(word: string) {
    try {
      const id = crypto.randomUUID();
      const seed = makeSeed(word, id);
      const card = await insertCard(word, seed, id);
      markSubmitted();
      setCards((current) =>
        current.some((item) => item.id === card.id) ? current : [card, ...current],
      );
      setSelected(null);
      setGrowingId(card.id);
      setHighlightId(card.id);
      setNotice("You just grew The Hub.");
      window.setTimeout(() => setGrowingId((current) => (current === card.id ? null : current)), 1400);
      window.setTimeout(() => setHighlightId((current) => (current === card.id ? null : current)), 2600);
      window.setTimeout(() => setNotice(null), 4800);
    } catch {
      throw new Error("The Hub couldn’t save that word. Please try again.");
    }
  }

  return (
    <div className={styles.page}>
      <div className="hub-grain pointer-events-none absolute inset-0" />
      <header className={styles.header}>
        {onBack ? (
          <div className={styles.backRow}>
            <HubBackButton onBack={onBack} />
          </div>
        ) : null}
        <p className={styles.kicker}>The Hub</p>
        <h1 className={styles.title}>Leave a word. Let The Hub grow.</h1>
        <p className={styles.subtitle}>Every word becomes part of the vine.</p>
        {cards.length > VINE_DISPLAY_LIMIT ? (
          <p className={styles.note}>
            Showing the most recent {VINE_DISPLAY_LIMIT} words of {cards.length}.
          </p>
        ) : null}
      </header>

      <main
        ref={scrollRef}
        className={styles.scroll}
        onPointerDown={(event) => {
          const target = event.target as HTMLElement | null;
          if (!target?.closest("[data-leaf-id], [role='dialog']")) {
            setSelected(null);
          }
        }}
      >
        {status === "loading" ? (
          <p className={styles.status}>The vine is waking…</p>
        ) : null}
        {status === "error" ? (
          <p className={styles.status} role="alert">
            The Hub couldn’t be reached. Refresh to try again.
          </p>
        ) : null}
        {status === "ready" ? (
          <GrowingVine
            cards={cards}
            growingId={growingId}
            highlightId={highlightId}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
            onClose={() => setSelected(null)}
          />
        ) : null}
      </main>

      <div className={styles.dock}>
        {notice ? (
          <p role="status" className={styles.notice}>
            {notice}
          </p>
        ) : null}
        <VineWordInput onSubmitWord={handleSubmit} disabled={status !== "ready"} />
        <p className={styles.dockNote}>
          Every word grows The Hub.
          {!isSupabaseConfigured ? " Local archive until Supabase is connected." : ""}
        </p>
      </div>
    </div>
  );
}
