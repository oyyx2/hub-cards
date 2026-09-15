import { createRng, pick, randRange } from "@/lib/seed";
import type { HubCard } from "@/lib/types";

export function vineRng(card: HubCard) {
  return createRng(`${card.seed}:${card.id}`);
}

export const LEAF_KINDS = [
  "oval",
  "pointed",
  "heart",
  "narrow",
  "broad",
  "asymmetric",
  "curl",
] as const;

export type LeafKind = (typeof LEAF_KINDS)[number];

export const LEAF_COLORS = [
  "#314232",
  "#3d5340",
  "#243528",
  "#4a5c38",
  "#5c6b42",
  "#6a5a32",
  "#2f4634",
] as const;

export function pickLeafKind(rng: () => number): LeafKind {
  return pick(rng, LEAF_KINDS);
}

export function pickLeafColor(rng: () => number) {
  return pick(rng, LEAF_COLORS);
}

export function vineUnit(rng: () => number, min: number, max: number) {
  return randRange(rng, min, max);
}
