import type { VisualTheme } from "./types";

export function hashToUint32(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function makeSeed(word: string, unique: string): string {
  return String(hashToUint32(`${word.toLowerCase()}|${unique}`));
}

export function createRng(seedInput: string | number) {
  let a =
    typeof seedInput === "number" ? seedInput >>> 0 : hashToUint32(String(seedInput));

  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randRange(rng: () => number, min: number, max: number) {
  return min + rng() * (max - min);
}

export function randInt(rng: () => number, min: number, max: number) {
  return Math.floor(randRange(rng, min, max + 1));
}

export function pick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)]!;
}

export function shuffle<T>(rng: () => number, items: readonly T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [next[i], next[j]] = [next[j]!, next[i]!];
  }
  return next;
}

const THEME_WORDS: Record<Exclude<VisualTheme, "neutral">, string[]> = {
  curious: [
    "curious",
    "wonder",
    "seek",
    "question",
    "open",
    "explorer",
    "inquisitive",
  ],
  calm: ["calm", "peace", "quiet", "still", "gentle", "serene", "soft", "steady"],
  bold: ["bold", "brave", "fierce", "loud", "sun", "strong", "daring", "fire"],
  creative: [
    "creative",
    "artist",
    "inventive",
    "playful",
    "imaginative",
    "maker",
    "dream",
  ],
  analytical: [
    "analytical",
    "logic",
    "precise",
    "reason",
    "structured",
    "focus",
    "method",
    "clear",
  ],
};

export function themeFromWord(word: string): VisualTheme {
  const normalized = word.trim().toLowerCase();
  for (const [theme, words] of Object.entries(THEME_WORDS) as [
    Exclude<VisualTheme, "neutral">,
    string[],
  ][]) {
    if (words.includes(normalized)) return theme;
  }
  return "neutral";
}
