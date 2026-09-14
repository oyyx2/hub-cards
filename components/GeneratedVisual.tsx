"use client";

import { createRng, pick, randInt, randRange, themeFromWord } from "@/lib/seed";
import { cn } from "@/lib/utils";

type GeneratedVisualProps = {
  word: string;
  seed: string;
  className?: string;
  parallax?: { x: number; y: number };
};

type Palette = {
  sky: [string, string];
  ink: string;
  gold: string;
  cream: string;
  accent: string;
};

const PALETTES: Palette[] = [
  {
    sky: ["#0b140e", "#1c2b1f"],
    ink: "#e7d8bc",
    gold: "#c6a46a",
    cream: "#efe3cb",
    accent: "#6d97e8",
  },
  {
    sky: ["#0e1711", "#243528"],
    ink: "#f1e6cf",
    gold: "#b8944a",
    cream: "#e8d7b3",
    accent: "#7aa8f0",
  },
  {
    sky: ["#0a120d", "#18241c"],
    ink: "#ddcfb4",
    gold: "#d0b178",
    cream: "#f4ead6",
    accent: "#5d86d4",
  },
  {
    sky: ["#111a13", "#2a3828"],
    ink: "#eadfc8",
    gold: "#a9864c",
    cream: "#e2d2b0",
    accent: "#88b0ee",
  },
];

const THEME_MOTIFS: Record<string, string[]> = {
  curious: ["orbit", "eye", "starfield", "rings"],
  calm: ["wave", "moon", "rings", "arcs"],
  bold: ["sun", "pillars", "diamond", "arcs"],
  creative: ["bloom", "starfield", "orbit", "diamond"],
  analytical: ["grid", "nodes", "pillars", "rings"],
  neutral: ["orbit", "moon", "starfield", "arcs", "rings", "diamond", "wave", "sun"],
};

export function GeneratedVisual({
  word,
  seed,
  className,
  parallax = { x: 0, y: 0 },
}: GeneratedVisualProps) {
  const rng = createRng(seed);
  const theme = themeFromWord(word);
  const palette = PALETTES[randInt(rng, 0, PALETTES.length - 1)]!;
  const uid = `hub-${seed.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12)}`;
  const motifPool = THEME_MOTIFS[theme] ?? THEME_MOTIFS.neutral;
  const motifCount = randInt(rng, 2, 4);
  const motifs: string[] = [];
  while (motifs.length < motifCount) {
    const next = pick(rng, motifPool!);
    if (!motifs.includes(next)) motifs.push(next);
  }

  const stars = Array.from({ length: randInt(rng, 8, 18) }, () => ({
    x: randRange(rng, 12, 188),
    y: randRange(rng, 16, 210),
    r: randRange(rng, 0.4, 1.6),
    o: randRange(rng, 0.25, 0.8),
  }));

  const grainOpacity = randRange(rng, 0.12, 0.22);

  return (
    <svg
      viewBox="0 0 200 260"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
      style={{
        transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.04)`,
      }}
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky[1]} />
          <stop offset="100%" stopColor={palette.sky[0]} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="42%" r="48%">
          <stop offset="0%" stopColor={palette.accent} stopOpacity="0.22" />
          <stop offset="55%" stopColor={palette.gold} stopOpacity="0.08" />
          <stop offset="100%" stopColor={palette.sky[0]} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-vignette`} cx="50%" cy="45%" r="72%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
        <filter id={`${uid}-grain`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            seed={randInt(rng, 1, 9999)}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={grainOpacity} />
          </feComponentTransfer>
        </filter>
        <clipPath id={`${uid}-frame`}>
          <rect x="8" y="8" width="184" height="244" rx="6" />
        </clipPath>
      </defs>

      <rect width="200" height="260" fill={`url(#${uid}-sky)`} />
      <rect width="200" height="260" fill={`url(#${uid}-glow)`} />

      <g clipPath={`url(#${uid}-frame)`}>
        {motifs.map((motif, index) => (
          <g key={`${motif}-${index}`} opacity={0.92}>
            {renderMotif(motif, rng, palette, index)}
          </g>
        ))}
        {stars.map((star, index) => (
          <circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill={star.r > 1.1 ? palette.cream : palette.gold}
            opacity={star.o}
          />
        ))}
        <rect width="200" height="260" filter={`url(#${uid}-grain)`} />
        <rect width="200" height="260" fill={`url(#${uid}-vignette)`} />
      </g>

      <rect
        x="10"
        y="10"
        width="180"
        height="240"
        rx="5"
        fill="none"
        stroke={palette.gold}
        strokeOpacity="0.35"
        strokeWidth="0.7"
      />
    </svg>
  );
}

function renderMotif(
  motif: string,
  rng: () => number,
  palette: Palette,
  index: number,
) {
  const cx = randRange(rng, 70, 130);
  const cy = randRange(rng, 80, 150);
  const scale = randRange(rng, 0.78, 1.18);
  const rot = randRange(rng, -28, 28);

  switch (motif) {
    case "orbit":
      return (
        <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${scale})`}>
          <ellipse
            rx={randRange(rng, 42, 68)}
            ry={randRange(rng, 16, 28)}
            fill="none"
            stroke={palette.gold}
            strokeWidth="1"
            opacity="0.7"
          />
          <ellipse
            rx={randRange(rng, 28, 50)}
            ry={randRange(rng, 10, 20)}
            fill="none"
            stroke={palette.accent}
            strokeWidth="0.7"
            opacity="0.55"
            transform={`rotate(${randRange(rng, 20, 70)})`}
          />
          <circle
            cx={randRange(rng, 28, 54)}
            cy={0}
            r={randRange(rng, 2.4, 4.2)}
            fill={palette.cream}
          />
        </g>
      );
    case "eye":
      return (
        <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
          <ellipse
            rx="46"
            ry="22"
            fill={palette.cream}
            fillOpacity="0.08"
            stroke={palette.gold}
            strokeWidth="1.1"
          />
          <circle
            r="12"
            fill={palette.accent}
            fillOpacity="0.35"
            stroke={palette.ink}
            strokeWidth="0.8"
          />
          <circle r="4.5" fill={palette.sky[0]} />
          <circle cx="-3" cy="-3" r="1.4" fill={palette.cream} opacity="0.8" />
        </g>
      );
    case "moon":
      return (
        <g transform={`translate(${cx} ${cy - 8}) scale(${scale})`}>
          <circle
            r="34"
            fill={palette.cream}
            fillOpacity="0.12"
            stroke={palette.gold}
            strokeWidth="1"
          />
          <circle
            cx={randRange(rng, 10, 18)}
            cy={randRange(rng, -10, -2)}
            r="28"
            fill={palette.sky[0]}
            opacity="0.92"
          />
        </g>
      );
    case "sun": {
      const rays = randInt(rng, 8, 12);
      return (
        <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${scale})`}>
          {Array.from({ length: rays }, (_, i) => (
            <line
              key={i}
              x1="0"
              y1="-18"
              x2="0"
              y2={-randRange(rng, 34, 52)}
              stroke={palette.gold}
              strokeWidth="1"
              transform={`rotate(${(i * 360) / rays})`}
              opacity="0.75"
            />
          ))}
          <circle
            r="16"
            fill={palette.gold}
            fillOpacity="0.2"
            stroke={palette.gold}
            strokeWidth="1.1"
          />
        </g>
      );
    }
    case "wave":
      return (
        <g opacity="0.8">
          {[0, 1, 2].map((line) => {
            const y = 120 + line * 22 + index * 8;
            const amp = randRange(rng, 8, 16);
            return (
              <path
                key={line}
                d={`M 12 ${y} C 50 ${y - amp}, 90 ${y + amp}, 128 ${y} S 176 ${y - amp}, 188 ${y}`}
                fill="none"
                stroke={line === 1 ? palette.accent : palette.gold}
                strokeWidth={line === 1 ? 1.2 : 0.8}
              />
            );
          })}
        </g>
      );
    case "rings":
      return (
        <g transform={`translate(${cx} ${cy})`}>
          {[18, 32, 48, 64].slice(0, randInt(rng, 3, 4)).map((r) => (
            <circle
              key={r}
              r={r * scale}
              fill="none"
              stroke={palette.gold}
              strokeWidth="0.8"
              opacity={0.35 + r / 180}
            />
          ))}
        </g>
      );
    case "grid":
      return (
        <g opacity="0.45" stroke={palette.gold} strokeWidth="0.55">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`v${i}`} x1={28 + i * 24} y1="28" x2={28 + i * 24} y2="220" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`h${i}`} x1="22" y1={36 + i * 24} x2="178" y2={36 + i * 24} />
          ))}
        </g>
      );
    case "nodes": {
      const points = Array.from({ length: randInt(rng, 6, 9) }, () => ({
        x: randRange(rng, 30, 170),
        y: randRange(rng, 40, 200),
      }));
      return (
        <g>
          {points.map((point, i) => {
            const other = points[(i + 1) % points.length]!;
            return (
              <line
                key={`l${i}`}
                x1={point.x}
                y1={point.y}
                x2={other.x}
                y2={other.y}
                stroke={palette.gold}
                strokeWidth="0.7"
                opacity="0.55"
              />
            );
          })}
          {points.map((point, i) => (
            <circle
              key={`n${i}`}
              cx={point.x}
              cy={point.y}
              r="2.4"
              fill={palette.cream}
            />
          ))}
        </g>
      );
    }
    case "pillars":
      return (
        <g fill={palette.gold} fillOpacity="0.16" stroke={palette.gold} strokeWidth="0.8">
          {Array.from({ length: randInt(rng, 3, 5) }, (_, i) => {
            const x = 40 + i * 28;
            const h = randRange(rng, 70, 140);
            return (
              <rect
                key={i}
                x={x}
                y={210 - h}
                width="14"
                height={h}
                rx="1"
              />
            );
          })}
        </g>
      );
    case "arcs":
      return (
        <g
          fill="none"
          stroke={palette.gold}
          strokeWidth="1"
          transform={`translate(100 210) scale(${scale})`}
        >
          {[40, 62, 84].map((r, i) => (
            <path
              key={r}
              d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`}
              opacity={0.45 + i * 0.15}
            />
          ))}
        </g>
      );
    case "diamond":
      return (
        <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${scale})`}>
          <polygon
            points="0,-48 36,0 0,48 -36,0"
            fill={palette.accent}
            fillOpacity="0.1"
            stroke={palette.gold}
            strokeWidth="1"
          />
          <polygon
            points="0,-24 18,0 0,24 -18,0"
            fill="none"
            stroke={palette.cream}
            strokeWidth="0.7"
            opacity="0.7"
          />
        </g>
      );
    case "bloom": {
      const petals = randInt(rng, 5, 8);
      return (
        <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
          {Array.from({ length: petals }, (_, i) => (
            <ellipse
              key={i}
              rx={randRange(rng, 10, 16)}
              ry={randRange(rng, 28, 42)}
              fill={palette.gold}
              fillOpacity="0.08"
              stroke={palette.gold}
              strokeWidth="0.8"
              transform={`rotate(${(i * 360) / petals})`}
            />
          ))}
        </g>
      );
    }
    case "starfield":
      return (
        <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
          <StarPath r={randRange(rng, 16, 26)} fill={palette.gold} />
          <circle
            r="46"
            fill="none"
            stroke={palette.accent}
            strokeWidth="0.6"
            strokeDasharray="2 6"
            opacity="0.6"
          />
        </g>
      );
    default:
      return null;
  }
}

function StarPath({ r, fill }: { r: number; fill: string }) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const radius = i % 2 === 0 ? r : r * 0.42;
    return `${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
  }).join(" ");
  return (
    <polygon
      points={points}
      fill={fill}
      fillOpacity="0.18"
      stroke={fill}
      strokeWidth="0.9"
    />
  );
}
