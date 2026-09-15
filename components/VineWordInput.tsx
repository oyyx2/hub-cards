"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { remainingCooldownMs, validateWord } from "@/lib/word";

type VineWordInputProps = {
  onSubmitWord: (word: string) => Promise<void>;
  disabled?: boolean;
};

export function VineWordInput({ onSubmitWord, disabled = false }: VineWordInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || disabled) return;

    const cooldown = remainingCooldownMs();
    if (cooldown > 0) {
      setError(`Give the vine a moment. Try again in ${Math.ceil(cooldown / 1000)}s.`);
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
      setError(
        submitError instanceof Error
          ? submitError.message
          : "The Hub couldn’t save that word. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-xl flex-col gap-2">
      <label htmlFor="vine-word" className="sr-only">
        Describe yourself in one word
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id="vine-word"
          name="word"
          value={value}
          maxLength={20}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Describe yourself in one word"
          disabled={submitting || disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "vine-word-error" : "vine-word-help"}
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
          className="h-12 shrink-0 rounded-xl border border-[#c6a46a]/40 bg-[#c6a46a] px-5 font-medium tracking-wide text-[#1a1408] hover:bg-[#d4b57a]"
        >
          {submitting ? "Growing…" : "Grow the vine"}
        </Button>
      </div>
      <p id="vine-word-help" className="text-center text-xs tracking-wide text-[#d8cbb0]/55">
        One word, 20 characters or fewer. No name needed.
      </p>
      {error ? (
        <p id="vine-word-error" role="alert" className="text-center text-sm text-[#e2b4a0]">
          {error}
        </p>
      ) : null}
    </form>
  );
}
