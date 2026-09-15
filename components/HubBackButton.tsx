"use client";

type HubBackButtonProps = {
  onBack: () => void;
};

export function HubBackButton({ onBack }: HubBackButtonProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="inline-flex min-h-11 items-center rounded-full border border-[#c6a46a]/28 bg-[#0d1510]/60 px-3.5 py-1.5 text-[0.68rem] tracking-[0.18em] text-[#d8cbb0]/80 backdrop-blur-sm transition-colors hover:border-[#c6a46a]/60 hover:text-[#f4ead6] focus-visible:ring-2 focus-visible:ring-[#c6a46a]"
    >
      Back to The Hub
    </button>
  );
}
