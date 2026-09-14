"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { GeneratedVisual } from "@/components/GeneratedVisual";
import { displayWord } from "@/lib/word";
import type { HubCard } from "@/lib/types";
import { cn } from "@/lib/utils";

type PersonalityCardProps = {
  card: HubCard;
  number: number;
  highlighted?: boolean;
  onOpen: (card: HubCard) => void;
};

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return fine;
}

export function PersonalityCard({
  card,
  number,
  highlighted = false,
  onOpen,
}: PersonalityCardProps) {
  const canTilt = useFinePointer();
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  function resetTilt() {
    setTilt({ rx: 0, ry: 0 });
    setParallax({ x: 0, y: 0 });
  }

  function handleMove(event: MouseEvent<HTMLButtonElement>) {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -9, ry: px * 12 });
    setParallax({ x: px * 7, y: py * 7 });
  }

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(card)}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      aria-label={`${displayWord(card.word)}, card ${String(number).padStart(3, "0")}`}
      className={cn(
        "group w-full origin-center text-left outline-none transition-[transform,box-shadow] duration-200 touch-manipulation",
        "focus-visible:ring-2 focus-visible:ring-[#c6a46a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101a12]",
        highlighted && "hub-card-arrive",
      )}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
      }}
    >
      <article
        className={cn(
          "relative aspect-[2/3] overflow-hidden rounded-[18px] border border-[#c6a46a]/55 bg-[#10180f]",
          "shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-shadow duration-200",
          "group-hover:-translate-y-1 group-hover:shadow-[0_18px_36px_rgba(0,0,0,0.5)]",
          highlighted && "ring-1 ring-[#d7bc7d]/80",
        )}
      >
        <div className="absolute inset-[7px] overflow-hidden rounded-[12px] border border-[#efe3cb]/18">
          <div className="absolute inset-0">
            <GeneratedVisual word={card.word} seed={card.seed} parallax={parallax} />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b120c] via-[#0b120c]/88 to-transparent px-2.5 pb-3 pt-10 text-center">
            <p
              className={cn(
                "font-heading text-[#f1e6cf]",
                displayWord(card.word).length > 11
                  ? "text-[0.78rem] leading-tight tracking-[0.08em] break-all"
                  : "text-[1.05rem] tracking-[0.22em]",
              )}
            >
              {displayWord(card.word)}
            </p>
            <p className="mt-1 font-sans text-[0.68rem] tracking-[0.28em] text-[#c6a46a]/90">
              #{String(number).padStart(3, "0")}
            </p>
          </div>
        </div>
      </article>
    </button>
  );
}
