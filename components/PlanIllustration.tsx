import type { PlanVisualId } from "@/data/annualPlanData";

type PlanIllustrationProps = {
  visual: PlanVisualId;
};

export function PlanIllustration({ visual }: PlanIllustrationProps) {
  switch (visual) {
    case "explorer":
      return <ExplorerArt />;
    case "sprint":
      return <SprintArt />;
    case "knowledge":
      return <KnowledgeArt />;
    case "visit":
      return <VisitArt />;
    case "problem-night":
      return <ProblemNightArt />;
    case "filter":
      return <FilterArt />;
    case "social-night":
      return <SocialNightArt />;
    case "movie":
      return <MovieArt />;
    case "archery":
      return <ArcheryArt />;
    case "kayak":
      return <KayakArt />;
    case "closing":
      return <ClosingArt />;
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

function SprintArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="sp-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0 H0 V12" fill="none" stroke="#c6a46a" strokeOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="200" height="220" fill="#1c2a22" />
      <rect width="200" height="220" fill="url(#sp-grid)" />
      <rect x="18" y="132" width="164" height="58" rx="4" fill="#314232" />
      <rect x="30" y="84" width="36" height="48" fill="#c6a46a" fillOpacity="0.32" stroke="#c6a46a" />
      <rect x="72" y="66" width="40" height="66" fill="#efe3cb" fillOpacity="0.18" stroke="#efe3cb" />
      <rect x="118" y="92" width="36" height="40" fill="#6ea8ff" fillOpacity="0.22" stroke="#6ea8ff" />
      <rect x="158" y="108" width="22" height="24" fill="#c6a46a" fillOpacity="0.2" stroke="#c6a46a" />
      <path d="M28 48 H86 M86 48 L108 70 M40 58 H70" stroke="#6ea8ff" strokeOpacity="0.55" />
      <circle cx="154" cy="42" r="11" fill="none" stroke="#c6a46a" />
      <circle cx="154" cy="42" r="3" fill="#c6a46a" />
      <path d="M48 168 H92 M56 176 H110" stroke="#efe3cb" strokeOpacity="0.45" />
      <path d="M54 150 C68 136, 88 136, 102 150" fill="none" stroke="#ead7c4" />
      <path d="M118 154 C132 142, 148 142, 160 156" fill="none" stroke="#ead7c4" />
    </svg>
  );
}

function KnowledgeArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="220" fill="#18241c" />
      <path d="M18 188 C40 160, 52 176, 46 200" fill="none" stroke="#c6a46a" strokeOpacity="0.45" />
      <path d="M168 196 C186 168, 196 176, 190 208" fill="none" stroke="#c6a46a" strokeOpacity="0.45" />
      <rect x="30" y="46" width="140" height="128" rx="4" fill="#243528" stroke="#c6a46a" />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect
            x="42"
            y={62 + row * 34}
            width="116"
            height="26"
            fill="#10180f"
            stroke="#c6a46a"
            strokeOpacity="0.45"
          />
          <rect x="50" y={70 + row * 34} width="16" height="10" fill="#c6a46a" />
          <path d={`M74 ${76 + row * 34} H140`} stroke="#efe3cb" strokeOpacity="0.4" />
        </g>
      ))}
      <rect x="54" y="168" width="22" height="28" fill="#7a5a28" />
      <rect x="80" y="162" width="22" height="34" fill="#c6a46a" fillOpacity="0.55" />
      <rect x="106" y="170" width="22" height="26" fill="#314232" stroke="#c6a46a" />
      <circle cx="44" cy="36" r="3" fill="#c6a46a" />
      <circle cx="100" cy="24" r="2.4" fill="#6ea8ff" />
      <circle cx="156" cy="36" r="3" fill="#c6a46a" />
      <path d="M44 36 L100 24 L156 36" fill="none" stroke="#c6a46a" strokeOpacity="0.5" />
    </svg>
  );
}

function VisitArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="220" fill="#d8cbb0" />
      <path d="M0 118 L28 88 L48 118" fill="#8a9a88" />
      <path d="M150 122 L176 86 L200 122" fill="#7d8c7c" />
      <rect x="0" y="148" width="200" height="72" fill="#243528" />
      <rect x="68" y="52" width="64" height="116" fill="#314232" stroke="#1a1408" />
      <rect x="34" y="86" width="34" height="82" fill="#3d5340" />
      <rect x="132" y="74" width="38" height="94" fill="#2a3c30" />
      {[62, 78, 94, 110, 126].map((y) => (
        <g key={y}>
          <rect x="78" y={y} width="10" height="8" fill="#efe3cb" opacity="0.55" />
          <rect x="112" y={y} width="10" height="8" fill="#efe3cb" opacity="0.55" />
        </g>
      ))}
      {[96, 112, 128].map((y) => (
        <rect key={y} x="144" y={y} width="8" height="7" fill="#efe3cb" opacity="0.4" />
      ))}
      <path d="M84 148 H116 V168 H84 Z" fill="none" stroke="#c6a46a" />
      <rect x="94" y="136" width="14" height="32" fill="#c6a46a" />
      <path d="M0 148 L46 118 L70 148" fill="#314232" />
    </svg>
  );
}

function ProblemNightArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="220" fill="#1a241c" />
      <ellipse cx="100" cy="138" rx="68" ry="20" fill="#314232" />
      <circle cx="62" cy="104" r="17" fill="#c6a46a" fillOpacity="0.22" stroke="#c6a46a" />
      <circle cx="138" cy="102" r="17" fill="#efe3cb" fillOpacity="0.16" stroke="#efe3cb" />
      <circle cx="100" cy="84" r="17" fill="#6ea8ff" fillOpacity="0.16" stroke="#6ea8ff" />
      <path d="M54 108 L48 118 M70 108 L76 118" stroke="#c6a46a" strokeOpacity="0.7" />
      <path d="M130 106 L124 116 M146 106 L152 116" stroke="#efe3cb" strokeOpacity="0.5" />
      <rect x="78" y="154" width="44" height="28" fill="#efe3cb" fillOpacity="0.14" stroke="#c6a46a" />
      <path d="M86 164 H114 M86 172 H104" stroke="#c6a46a" />
      <path d="M148 64 C164 52, 174 66, 158 76 Z" fill="#efe3cb" fillOpacity="0.28" />
      <path d="M42 70 C28 58, 18 72, 34 80 Z" fill="#c6a46a" fillOpacity="0.22" />
      <circle cx="168" cy="168" r="7" fill="none" stroke="#c6a46a" />
    </svg>
  );
}

function FilterArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="220" fill="#151c18" />
      <rect x="28" y="36" width="92" height="118" fill="#1c2a22" stroke="#8aa4c8" strokeOpacity="0.45" />
      <rect x="40" y="48" width="68" height="14" fill="#c6a46a" fillOpacity="0.28" />
      <rect x="40" y="70" width="68" height="12" fill="#efe3cb" fillOpacity="0.08" />
      <rect x="40" y="90" width="68" height="12" fill="#6ea8ff" fillOpacity="0.16" />
      <rect x="40" y="110" width="48" height="12" fill="#efe3cb" fillOpacity="0.08" />
      <rect x="118" y="58" width="54" height="36" fill="#243528" stroke="#c6a46a" />
      <rect x="118" y="102" width="54" height="36" fill="#243528" stroke="#8aa4c8" strokeOpacity="0.5" />
      <path d="M128 70 H160 M128 78 H148 M128 114 H158 M128 122 H146" stroke="#efe3cb" strokeOpacity="0.4" />
      <circle cx="84" cy="168" r="18" fill="none" stroke="#c6a46a" strokeWidth="2" />
      <path d="M98 182 L114 198" stroke="#c6a46a" strokeWidth="2" />
      <rect x="132" y="158" width="36" height="28" fill="#314232" stroke="#c6a46a" strokeOpacity="0.5" />
    </svg>
  );
}

function SocialNightArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="220" fill="#24181c" />
      {[36, 92, 148, 176].map((x) => (
        <circle key={x} cx={x} cy="28" r="2" fill="#c6a46a" opacity="0.7" />
      ))}
      <circle cx="58" cy="86" r="22" fill="#c47a64" fillOpacity="0.32" stroke="#c47a64" />
      <path d="M58 108 V150" stroke="#c6a46a" strokeWidth="3" />
      <rect x="96" y="58" width="26" height="34" rx="2" fill="#efe3cb" />
      <rect x="128" y="66" width="26" height="34" rx="2" fill="#7a3a3a" />
      <rect x="160" y="58" width="18" height="24" rx="2" fill="#d8cbb0" />
      <rect x="165" y="66" width="8" height="8" fill="#7a3a3a" opacity="0.7" />
      <rect x="108" y="118" width="64" height="38" rx="6" fill="#314232" stroke="#c6a46a" />
      <circle cx="124" cy="137" r="6" fill="#efe3cb" fillOpacity="0.2" stroke="#efe3cb" />
      <circle cx="144" cy="137" r="6" fill="#efe3cb" fillOpacity="0.2" stroke="#efe3cb" />
      <circle cx="156" cy="128" r="4" fill="#6ea8ff" fillOpacity="0.4" />
      <circle cx="40" cy="176" r="3" fill="#c6a46a" />
      <circle cx="56" cy="166" r="2" fill="#6ea8ff" />
      <circle cx="176" cy="176" r="2" fill="#efe3cb" />
    </svg>
  );
}

function MovieArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="220" fill="#1a1216" />
      <path d="M0 0 L40 36 V184 L0 220 Z" fill="#7a3a3a" />
      <path d="M200 0 L160 36 V184 L200 220 Z" fill="#7a3a3a" />
      <rect x="48" y="44" width="104" height="72" fill="#efe3cb" fillOpacity="0.12" stroke="#c6a46a" />
      <path d="M70 80 Q100 64 130 80" fill="none" stroke="#f4ead6" strokeOpacity="0.35" />
      <circle cx="64" cy="154" r="16" fill="none" stroke="#c6a46a" strokeWidth="3" />
      <circle cx="64" cy="154" r="6" fill="#c6a46a" />
      <circle cx="64" cy="154" r="28" fill="none" stroke="#c6a46a" strokeOpacity="0.25" />
      <rect x="98" y="140" width="46" height="28" rx="3" fill="#c6a46a" fillOpacity="0.3" stroke="#c6a46a" />
      <path d="M108 150 H134 M108 158 H128" stroke="#1a1408" strokeOpacity="0.55" />
      <ellipse cx="158" cy="176" rx="10" ry="7" fill="#efe3cb" fillOpacity="0.35" />
      <ellipse cx="170" cy="180" rx="7" ry="5" fill="#c6a46a" fillOpacity="0.45" />
      {[48, 72, 128, 152].map((x) => (
        <circle key={x} cx={x} cy="28" r="1.6" fill="#f4ead6" />
      ))}
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

function ClosingArt() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
      <rect width="200" height="220" fill="#14140f" />
      <path d="M22 170 L100 64 L178 170 Z" fill="#243528" stroke="#c6a46a" />
      <rect x="84" y="112" width="32" height="58" fill="#c6a46a" fillOpacity="0.28" />
      <rect x="36" y="128" width="28" height="22" fill="#efe3cb" fillOpacity="0.12" stroke="#c6a46a" />
      <rect x="136" y="128" width="28" height="22" fill="#6ea8ff" fillOpacity="0.14" stroke="#6ea8ff" />
      <circle cx="58" cy="46" r="3" fill="#f4ead6" />
      <circle cx="100" cy="32" r="2.6" fill="#6ea8ff" />
      <circle cx="144" cy="48" r="2" fill="#c6a46a" />
      <circle cx="78" cy="28" r="1.5" fill="#f4ead6" />
      <ellipse cx="64" cy="182" rx="12" ry="7" fill="#efe3cb" fillOpacity="0.2" />
      <ellipse cx="136" cy="182" rx="12" ry="7" fill="#efe3cb" fillOpacity="0.2" />
      <circle cx="48" cy="176" r="6" fill="none" stroke="#c6a46a" />
      <circle cx="160" cy="176" r="6" fill="none" stroke="#c6a46a" />
      <path d="M24 196 H176" stroke="#c6a46a" strokeOpacity="0.4" />
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
