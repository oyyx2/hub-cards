"use client";

import { PersonalityCard } from "@/components/PersonalityCard";
import type { HubCard } from "@/lib/types";

type CardWallProps = {
  cards: HubCard[];
  highlightId?: string | null;
  onOpen: (card: HubCard) => void;
};

export function CardWall({ cards, highlightId, onOpen }: CardWallProps) {
  if (cards.length === 0) {
    return (
      <div className="flex min-h-[42vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-heading text-2xl text-[#efe3cb]">The archive is waiting.</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[#d8cbb0]/75">
          Be the first to leave a word. Your card will stay here for everyone who
          enters after you.
        </p>
      </div>
    );
  }

  const total = cards.length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
      {cards.map((card, index) => (
        <PersonalityCard
          key={card.id}
          card={card}
          number={total - index}
          highlighted={card.id === highlightId}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
