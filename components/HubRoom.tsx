"use client";

import { useEffect, useMemo, useState } from "react";
import { CardModal } from "@/components/CardModal";
import { CardWall } from "@/components/CardWall";
import { WordInput } from "@/components/WordInput";
import { fetchCards, insertCard, isSupabaseConfigured, subscribeToCards } from "@/lib/supabase";
import { makeSeed } from "@/lib/seed";
import { markSubmitted } from "@/lib/word";
import type { HubCard } from "@/lib/types";
import { cn } from "@/lib/utils";

type HubRoomProps = {
  active?: boolean;
};

export function HubRoom({ active = true }: HubRoomProps) {
  const [cards, setCards] = useState<HubCard[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selected, setSelected] = useState<HubCard | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const next = await fetchCards();
        if (!cancelled) {
          setCards(next);
          setStatus("ready");
        }
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

  const selectedNumber = useMemo(() => {
    if (!selected) return undefined;
    const index = cards.findIndex((card) => card.id === selected.id);
    if (index < 0) return undefined;
    return cards.length - index;
  }, [cards, selected]);

  async function handleSubmit(word: string) {
    try {
      const id = crypto.randomUUID();
      const seed = makeSeed(word, id);
      const card = await insertCard(word, seed, id);
      markSubmitted();
      setCards((current) =>
        current.some((item) => item.id === card.id) ? current : [card, ...current],
      );
      setHighlightId(card.id);
      setNotice("You’re now part of The Hub.");
      window.setTimeout(() => setHighlightId(null), 2400);
      window.setTimeout(() => setNotice(null), 4200);
    } catch {
      throw new Error("The Hub couldn’t save that word. Please try again.");
    }
  }

  return (
    <div
      className={cn("hub-room relative flex h-dvh max-h-dvh flex-col overflow-hidden text-[#efe3cb]")}
      aria-hidden={!active}
      inert={!active ? true : undefined}
    >
      <div className="hub-grain pointer-events-none absolute inset-0" />
      <header className="relative z-10 mx-auto w-full max-w-6xl shrink-0 px-4 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))] text-center sm:px-6">
        <p className="font-heading text-sm tracking-[0.42em] text-[#c6a46a]">The Hub</p>
        <h1 className="mt-3 font-heading text-[1.85rem] leading-tight text-[#f4ead6] sm:text-4xl">
          Welcome to The Hub.
        </h1>
        <p className="mt-2 text-sm tracking-wide text-[#d8cbb0]/80">
          Get to know us — and let us get to know you.
        </p>
      </header>

      <main className="relative z-10 mx-auto min-h-0 w-full max-w-6xl flex-1 overflow-y-auto px-4 pb-4 sm:px-6">
        {status === "loading" ? (
          <p className="py-24 text-center text-sm tracking-[0.2em] text-[#d8cbb0]/70">
            Opening the archive…
          </p>
        ) : null}
        {status === "error" ? (
          <p className="py-24 text-center text-sm text-[#e2b4a0]" role="alert">
            The Hub couldn’t be reached. Refresh to try again.
          </p>
        ) : null}
        {status === "ready" ? (
          <CardWall cards={cards} highlightId={highlightId} onOpen={setSelected} />
        ) : null}
      </main>

      <div className="relative z-20 shrink-0 border-t border-[#c6a46a]/15 bg-[#0d1510]/92 backdrop-blur-md">
        <div className="mx-auto w-full max-w-3xl px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
          {notice ? (
            <p
              role="status"
              className="mb-2 text-center font-heading text-sm tracking-[0.14em] text-[#c6a46a]"
            >
              {notice}
            </p>
          ) : null}
          <WordInput onSubmitWord={handleSubmit} disabled={status !== "ready"} />
          <p className="mt-3 text-center text-[0.7rem] tracking-[0.18em] text-[#d8cbb0]/45">
            The Hub grows with everyone who enters.
            {!isSupabaseConfigured ? " Local archive until Supabase is connected." : ""}
          </p>
        </div>
      </div>

      {selected ? (
        <CardModal
          card={selected}
          number={selectedNumber}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </div>
  );
}
