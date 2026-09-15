import { useId } from "react";

type CardBackProps = {
  className?: string;
};

export function CardBack({ className }: CardBackProps) {
  const reactId = useId().replace(/:/g, "");
  const glowId = `${reactId}-glow`;
  const grainId = `${reactId}-grain`;

  return (
    <div className={className}>
      <svg viewBox="0 0 200 305" className="h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="38%" r="48%">
            <stop offset="0%" stopColor="#6ea8ff" stopOpacity="0.34" />
            <stop offset="55%" stopColor="#1a2a48" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#070b0a" stopOpacity="0" />
          </radialGradient>
          <filter id={grainId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="200" height="305" rx="16" fill="#0b120f" />
        <rect width="200" height="305" fill={`url(#${glowId})`} />
        <rect width="200" height="305" filter={`url(#${grainId})`} opacity="0.35" />
        <rect
          x="10"
          y="10"
          width="180"
          height="285"
          rx="12"
          fill="none"
          stroke="#c6a46a"
          strokeOpacity="0.45"
        />
        <rect
          x="16"
          y="16"
          width="168"
          height="273"
          rx="10"
          fill="none"
          stroke="#9ec4ff"
          strokeOpacity="0.22"
        />
        <g transform="translate(100 118)" fill="none" stroke="#9ec4ff" strokeLinejoin="round">
          <path
            d="M-28 -8 L0 -34 L28 -8 V28 H-28 Z"
            fill="#6ea8ff"
            fillOpacity="0.16"
            strokeWidth="1.7"
          />
          <path d="M-34 -6 L0 -38 L34 -6" strokeWidth="1.9" />
          <rect x="-6" y="8" width="12" height="20" fill="#b9d4ff" fillOpacity="0.35" />
          <rect x="-18" y="0" width="10" height="10" fill="#d7e7ff" fillOpacity="0.8" />
        </g>
        <text
          x="100"
          y="188"
          textAnchor="middle"
          fill="#cfe0ff"
          fontFamily="Georgia, serif"
          fontSize="13"
          letterSpacing="4"
        >
          THE HUB
        </text>
        <text
          x="100"
          y="208"
          textAnchor="middle"
          fill="#8ea6d8"
          fontFamily="sans-serif"
          fontSize="7"
          letterSpacing="2.4"
        >
          we Have ur Back
        </text>
      </svg>
    </div>
  );
}
