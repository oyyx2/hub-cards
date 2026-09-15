import type { HubCard } from "@/lib/types";
import {
  pickLeafColor,
  pickLeafKind,
  vineRng,
  vineUnit,
  type LeafKind,
} from "@/lib/vineSeed";

/** Easy to raise or remove once the prototype is approved. */
export const VINE_DISPLAY_LIMIT = 30;

export const VINE_WIDTH = 360;
export const VINE_STEP = 78;
export const VINE_TOP = 56;

export type VineLeafLayout = {
  card: HubCard;
  index: number;
  stemX: number;
  stemY: number;
  attachX: number;
  attachY: number;
  side: 1 | -1;
  leafAngle: number;
  scale: number;
  kind: LeafKind;
  color: string;
  opacity: number;
  veinShift: number;
};

export type VineLayout = {
  width: number;
  height: number;
  stemPath: string;
  leaves: VineLeafLayout[];
  tipX: number;
  tipY: number;
};

function compareOldestFirst(a: HubCard, b: HubCard) {
  const byTime = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  if (byTime !== 0) return byTime;
  return a.id.localeCompare(b.id);
}

export function recordsForVine(cards: HubCard[]) {
  const oldestFirst = [...cards].sort(compareOldestFirst);
  if (oldestFirst.length <= VINE_DISPLAY_LIMIT) return oldestFirst;
  return oldestFirst.slice(-VINE_DISPLAY_LIMIT);
}

function stemPoint(index: number, width: number) {
  const cx = width / 2;
  return {
    x: cx + Math.sin(index * 0.73) * 32 + Math.sin(index * 0.21 + 0.8) * 12,
    y: VINE_TOP + index * VINE_STEP,
  };
}

function catmullRomPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  if (points.length === 1) {
    const p = points[0]!;
    return `M ${p.x.toFixed(1)} ${(p.y - 42).toFixed(1)} C ${(p.x + 10).toFixed(1)} ${(p.y - 24).toFixed(1)}, ${(p.x - 8).toFixed(1)} ${(p.y - 10).toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }

  let d = `M ${points[0]!.x.toFixed(1)} ${points[0]!.y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export function layoutVine(cards: HubCard[], width = VINE_WIDTH): VineLayout {
  const records = recordsForVine(cards);
  const origin = { x: width / 2, y: 18 };
  const stemPoints = [origin, ...records.map((_, index) => stemPoint(index, width))];

  const leaves = records.map((card, index) => {
    const rng = vineRng(card);
    const stem = stemPoint(index, width);
    const prefer: 1 | -1 = index % 2 === 0 ? -1 : 1;
    const side: 1 | -1 = rng() < 0.22 ? ((prefer === 1 ? -1 : 1) as 1 | -1) : prefer;
    const reach = vineUnit(rng, 32, 62);
    const drop = vineUnit(rng, -8, 12);
    return {
      card,
      index,
      stemX: stem.x,
      stemY: stem.y,
      attachX: stem.x + side * reach,
      attachY: stem.y + drop,
      side,
      leafAngle: side * vineUnit(rng, -34, 16),
      scale: vineUnit(rng, 0.92, 1.28),
      kind: pickLeafKind(rng),
      color: pickLeafColor(rng),
      opacity: vineUnit(rng, 0.82, 1),
      veinShift: vineUnit(rng, -4, 4),
    };
  });

  const tip = stemPoints[stemPoints.length - 1] ?? origin;
  const empty = records.length === 0;
  return {
    width,
    height: empty ? 168 : tip.y + 88,
    stemPath: catmullRomPath(
      empty ? [origin, { x: width / 2, y: 96 }] : stemPoints,
    ),
    leaves,
    tipX: empty ? width / 2 : tip.x,
    tipY: empty ? 96 : tip.y,
  };
}
