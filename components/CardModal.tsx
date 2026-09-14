"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GeneratedVisual } from "@/components/GeneratedVisual";
import { displayWord } from "@/lib/word";
import type { HubCard } from "@/lib/types";

type CardModalProps = {
  card: HubCard | null;
  number?: number;
  onClose: () => void;
};

export function CardModal({ card, number, onClose }: CardModalProps) {
  const addedOn = card
    ? new Date(card.created_at).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Dialog open={Boolean(card)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-h-[min(92dvh,720px)] w-[min(100%-1.5rem,22rem)] overflow-y-auto border border-[#c6a46a]/40 bg-[#121c14] p-4 text-[#efe3cb] sm:max-w-[22rem]"
        showCloseButton
      >
        {card ? (
          <>
            <DialogHeader className="gap-1 text-center">
              <DialogTitle className="font-heading text-2xl tracking-[0.2em] text-[#f4ead6]">
                {displayWord(card.word)}
              </DialogTitle>
              <DialogDescription className="text-[#c6a46a]">
                Added to The Hub
                {typeof number === "number"
                  ? ` · #${String(number).padStart(3, "0")}`
                  : ""}
              </DialogDescription>
            </DialogHeader>
            <div className="mx-auto w-full max-w-[16.5rem] overflow-hidden rounded-[18px] border border-[#c6a46a]/50 bg-[#0d150f] shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
              <div className="aspect-[2/3]">
                <GeneratedVisual word={card.word} seed={card.seed} />
              </div>
            </div>
            <p className="text-center text-sm tracking-wide text-[#d8cbb0]/80">
              {addedOn}
            </p>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
