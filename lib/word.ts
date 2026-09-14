const MAX_LENGTH = 20;
const COOLDOWN_MS = 8000;
const LAST_SUBMIT_KEY = "the-hub-last-submit";

export function remainingCooldownMs(now = Date.now()): number {
  if (typeof window === "undefined") return 0;
  const last = Number(window.sessionStorage.getItem(LAST_SUBMIT_KEY) || "0");
  if (!Number.isFinite(last) || last <= 0) return 0;
  return Math.max(0, last + COOLDOWN_MS - now);
}

export function markSubmitted(now = Date.now()) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(LAST_SUBMIT_KEY, String(now));
}

export type WordValidation =
  | { ok: true; word: string }
  | { ok: false; error: string };

export function validateWord(raw: string): WordValidation {
  const word = raw.trim();

  if (!word) {
    return { ok: false, error: "Enter one word to continue." };
  }

  if (word.length > MAX_LENGTH) {
    return { ok: false, error: "Keep it to 20 characters or fewer." };
  }

  if (/\s/.test(word)) {
    return { ok: false, error: "One word only — no spaces." };
  }

  if (/[<>/`\\{}[\]();]|script|javascript:|on\w+=/i.test(word)) {
    return { ok: false, error: "That word can’t be used." };
  }

  if (!/^[\p{L}\p{M}'’-]+$/u.test(word)) {
    return { ok: false, error: "Use letters only — one word." };
  }

  return { ok: true, word };
}

export function displayWord(word: string) {
  return word.toLocaleUpperCase();
}
