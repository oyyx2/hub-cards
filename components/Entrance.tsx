"use client";

import { cn } from "@/lib/utils";

type EntranceProps = {
  exiting?: boolean;
  onEnter: () => void;
};

export function Entrance({ exiting = false, onEnter }: EntranceProps) {
  return (
    <button
      type="button"
      onClick={onEnter}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onEnter();
        }
      }}
      aria-label="Enter The Hub"
      className={cn(
        "fixed inset-0 z-[100] flex cursor-pointer touch-manipulation flex-col items-center justify-center bg-black outline-none transition-all duration-700 ease-out",
        "focus-visible:ring-2 focus-visible:ring-[#7eb6ff]/70 focus-visible:ring-inset",
        exiting && "pointer-events-none scale-[1.08] opacity-0",
      )}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        onEnter();
      }}
    >
      <span className="hub-house flex flex-col items-center gap-4 rounded-3xl px-8 py-10 transition-transform duration-300 hover:scale-110">
        <span className="hub-house-glow relative grid size-28 place-items-center sm:size-32">
          <HouseMark />
        </span>
        <span className="font-heading text-sm tracking-[0.5em] text-[#cfe0ff]/90">
          THE HUB
        </span>
        <span className="font-sans text-[0.72rem] tracking-[0.28em] text-[#8ea6d8]/80">
          we Have ur Back
        </span>
      </span>
    </button>
  );
}

function HouseMark() {
  return (
    <svg
      viewBox="0 0 80 84"
      className="relative z-10 h-[4.6rem] w-[4.6rem] sm:h-20 sm:w-20"
      aria-hidden="true"
    >
      <defs>
        <filter id="house-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#house-soft)" fill="none" stroke="#9ec4ff" strokeLinejoin="round">
        <path
          d="M12 36 L40 12 L68 36 V70 H12 Z"
          fill="#6ea8ff"
          fillOpacity="0.16"
          strokeWidth="1.8"
        />
        <path d="M8 38 L40 10 L72 38" strokeWidth="2" />
        <rect
          x="34"
          y="50"
          width="12"
          height="20"
          fill="#b9d4ff"
          fillOpacity="0.35"
          strokeWidth="1.4"
        />
        <rect
          x="20"
          y="44"
          width="11"
          height="11"
          fill="#d7e7ff"
          fillOpacity="0.8"
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
}
