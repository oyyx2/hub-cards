import type { PlanVisualId } from "@/data/annualPlanData";

type PlanIllustrationProps = {
  visual: PlanVisualId;
};

export function PlanIllustration({ visual }: PlanIllustrationProps) {
  switch (visual) {
    case "explorer":
      return <ExplorerArt />;
    case "archery":
      return <ArcheryArt />;
    case "kayak":
      return <KayakArt />;
    default:
      return <ArchiveSealArt />;
  }
}

function ExplorerArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ex-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#243528" />
          <stop offset="100%" stopColor="#10180f" />
        </linearGradient>
      </defs>
      <rect width="200" height="220" fill="url(#ex-sky)" />
      <ellipse cx="100" cy="96" rx="54" ry="54" fill="none" stroke="#c6a46a" strokeOpacity="0.45" />
      <ellipse
        cx="100"
        cy="96"
        rx="38"
        ry="16"
        fill="none"
        stroke="#6ea8ff"
        strokeOpacity="0.55"
        transform="rotate(-18 100 96)"
      />
      <circle cx="100" cy="96" r="13" fill="#efe3cb" fillOpacity="0.08" stroke="#efe3cb" />
      <circle cx="100" cy="96" r="5" fill="#0b120f" />
      <circle cx="97" cy="93" r="1.4" fill="#f4ead6" />
      {[
        [36, 42],
        [168, 38],
        [48, 150],
        [160, 146],
        [92, 28],
        [124, 176],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 1.4 : 2} fill="#f4ead6" opacity="0.85" />
      ))}
      <rect
        x="58"
        y="146"
        width="84"
        height="42"
        rx="3"
        fill="#0b120f"
        stroke="#c6a46a"
        strokeOpacity="0.6"
      />
      <path d="M66 158 H126 M66 168 H110 M66 178 H96" stroke="#6ea8ff" strokeWidth="1.2" />
      <circle cx="142" cy="58" r="3" fill="#6ea8ff" />
      <path d="M142 58 L158 44" stroke="#c6a46a" />
    </svg>
  );
}

function ArcheryArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ar-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7b7b0" />
          <stop offset="55%" stopColor="#ead7c4" />
          <stop offset="100%" stopColor="#314232" />
        </linearGradient>
      </defs>
      <rect width="200" height="220" fill="url(#ar-sky)" />
      <path d="M0 148 C50 128, 90 138, 200 122 L200 220 H0 Z" fill="#243528" />
      <circle cx="108" cy="92" r="46" fill="#efe3cb" fillOpacity="0.35" stroke="#7a3a3a" />
      <circle cx="108" cy="92" r="32" fill="none" stroke="#c6a46a" strokeWidth="3" />
      <circle cx="108" cy="92" r="18" fill="none" stroke="#7a3a3a" strokeWidth="3" />
      <circle cx="108" cy="92" r="6" fill="#7a3a3a" />
      <path d="M28 128 L108 92 L188 78" stroke="#1a1408" strokeWidth="1.5" />
      <path d="M96 86 L132 54" stroke="#efe3cb" strokeWidth="2" />
      <path d="M28 168 C44 140, 58 148, 52 176" fill="none" stroke="#c6a46a" />
      <path d="M160 176 C176 150, 188 156, 184 188" fill="none" stroke="#c6a46a" />
    </svg>
  );
}

function KayakArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ka-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8c4a8" />
          <stop offset="42%" stopColor="#9bb0a0" />
          <stop offset="100%" stopColor="#1d3a3a" />
        </linearGradient>
      </defs>
      <rect width="200" height="220" fill="url(#ka-sky)" />
      <path d="M0 92 L46 58 L78 86 L118 46 L200 90 V220 H0 Z" fill="#314232" />
      <path d="M0 128 C40 118, 90 136, 200 120 V220 H0 Z" fill="#1a3d42" />
      <path
        d="M18 148 C48 138, 90 158, 182 146"
        fill="none"
        stroke="#efe3cb"
        strokeOpacity="0.35"
      />
      <ellipse cx="96" cy="150" rx="58" ry="12" fill="#0f241f" />
      <path d="M44 148 C90 136, 130 136, 156 150 C120 158, 70 158, 44 148 Z" fill="#c47a64" />
      <rect x="88" y="138" width="16" height="10" rx="2" fill="#efe3cb" />
      <path d="M70 118 L128 168" stroke="#1a1408" strokeWidth="2" />
      <path d="M148 168 L168 148 L176 172 Z" fill="#c47a64" />
      <path d="M162 148 C166 136, 172 136, 174 148" fill="#e2b4a0" />
    </svg>
  );
}

function ArchiveSealArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="220" fill="#18241c" />
      <circle cx="100" cy="110" r="48" fill="none" stroke="#c6a46a" />
      <text
        x="100"
        y="116"
        textAnchor="middle"
        fill="#efe3cb"
        fontFamily="Georgia, serif"
        fontSize="13"
      >
        THE HUB
      </text>
    </svg>
  );
}
