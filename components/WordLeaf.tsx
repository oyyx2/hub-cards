import type { LeafKind } from "@/lib/vineSeed";

type WordLeafProps = {
  kind: LeafKind;
  color: string;
  opacity: number;
  veinShift: number;
  angle: number;
  scale: number;
};

function silhouette(kind: LeafKind) {
  switch (kind) {
    case "pointed":
      return "M8 4 C18 8, 26 18, 24 32 C22 44, 14 52, 8 54 C2 52, -6 44, -8 32 C-10 18, -2 8, 8 4 Z";
    case "heart":
      return "M8 50 C8 50, 26 32, 24 18 C22 8, 14 6, 8 16 C2 6, -6 8, -8 18 C-10 32, 8 50, 8 50 Z";
    case "narrow":
      return "M8 6 C14 10, 16 22, 15 36 C14 48, 10 54, 8 56 C6 54, 2 48, 1 36 C0 22, 2 10, 8 6 Z";
    case "broad":
      return "M8 8 C22 10, 30 22, 26 36 C22 50, 14 54, 8 56 C2 54, -6 50, -10 36 C-14 22, -6 10, 8 8 Z";
    case "asymmetric":
      return "M8 6 C20 12, 28 20, 22 36 C18 48, 12 54, 8 55 C0 48, -8 38, -4 24 C0 12, 2 8, 8 6 Z";
    case "curl":
      return "M10 8 C22 6, 28 16, 22 28 C30 30, 24 46, 10 54 C2 50, -4 40, 0 28 C-2 16, 2 10, 10 8 Z";
    default:
      return "M8 6 C20 10, 26 20, 24 34 C22 46, 14 54, 8 56 C2 54, -6 46, -8 34 C-10 20, -4 10, 8 6 Z";
  }
}

export function WordLeaf({
  kind,
  color,
  opacity,
  veinShift,
  angle,
  scale,
}: WordLeafProps) {
  return (
    <g opacity={opacity} transform={`rotate(${angle.toFixed(1)}) scale(${scale.toFixed(2)})`}>
      <g transform="translate(-8 -8)">
        <path d={silhouette(kind)} fill={color} />
        <path
          d={`M8 ${8 + veinShift} C${10 + veinShift} 22, 9 36, 8 50`}
          fill="none"
          stroke="#efe3cb"
          strokeOpacity="0.28"
          strokeWidth="0.9"
        />
        <path
          d={`M8 22 C${14 + veinShift} 24, ${16 + veinShift} 28, ${15 + veinShift} 32`}
          fill="none"
          stroke="#efe3cb"
          strokeOpacity="0.2"
          strokeWidth="0.7"
        />
      </g>
    </g>
  );
}
