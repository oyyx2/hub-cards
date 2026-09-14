"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { remainingCooldownMs, validateWord } from "@/lib/word";

type WordInputProps = {
  onSubmitWord: (word: string) => Promise<void>;
  disabled?: boolean;
};

export function WordInput({ onSubmitWord, disabled = false }: WordInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || disabled) return;

    const cooldown = remainingCooldownMs();
    if (cooldown > 0) {
      const seconds = Math.ceil(cooldown / 1000);
      setError(`Give the archive a moment. Try again in ${seconds}s.`);
      return;
    }

    const result = validateWord(value);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await onSubmitWord(result.word);
      setValue("");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "The Hub couldn’t save that word. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <label htmlFor="hub-word" className="sr-only">
        Describe yourself in one word
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id="hub-word"
          name="word"
          value={value}
          maxLength={20}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="One word…"
          disabled={submitting || disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "hub-word-error" : "hub-word-help"}
          onValueChange={(next) => {
            setValue(next.slice(0, 20));
            if (error) setError(null);
          }}
          className="h-12 rounded-xl border-[#c6a46a]/40 bg-[#0c140f]/80 px-4 text-base text-[#f4ead6] placeholder:text-[#d8cbb0]/45 focus-visible:border-[#c6a46a] focus-visible:ring-[#c6a46a]/40"
        />
        <Button
          type="submit"
          size="lg"
          disabled={submitting || disabled}
          className="h-12 shrink-0 rounded-xl border border-[#c6a46a]/40 bg-[#c6a46a] px-5 font-medium tracking-wide text-[#1a1408] hover:bg-[#d4b57a] focus-visible:ring-[#efe3cb]/50"
        >
          {submitting ? "Adding…" : "Add to The Hub"}
        </Button>
      </div>
      <p id="hub-word-help" className="text-xs tracking-wide text-[#d8cbb0]/55">
        One word, 20 characters or fewer. No name needed.
      </p>
      {error ? (
        <p id="hub-word-error" role="alert" className="text-sm text-[#e2b4a0]">
          {error}
        </p>
      ) : null}
    </form>
  );
}
