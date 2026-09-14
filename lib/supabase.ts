import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { HubCard } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const LOCAL_KEY = "the-hub-cards";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

function readLocalCards(): HubCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HubCard[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (card) =>
        card &&
        typeof card.id === "string" &&
        typeof card.word === "string" &&
        typeof card.seed === "string" &&
        typeof card.created_at === "string",
    );
  } catch {
    return [];
  }
}

function writeLocalCards(cards: HubCard[]) {
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(cards));
}

function sortNewestFirst(cards: HubCard[]) {
  return [...cards].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export async function fetchCards(): Promise<HubCard[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return sortNewestFirst(readLocalCards());
  }

  const { data, error } = await supabase
    .from("cards")
    .select("id, word, seed, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as HubCard[];
}

export async function insertCard(word: string, seed: string, id: string) {
  const supabase = getSupabase();
  if (!supabase) {
    const card: HubCard = {
      id,
      word,
      seed,
      created_at: new Date().toISOString(),
    };
    writeLocalCards(sortNewestFirst([card, ...readLocalCards()]));
    return card;
  }

  const { data, error } = await supabase
    .from("cards")
    .insert({ id, word, seed })
    .select("id, word, seed, created_at")
    .single();

  if (error) throw error;
  return data as HubCard;
}

export function subscribeToCards(onInsert: (card: HubCard) => void) {
  const supabase = getSupabase();
  if (!supabase) return () => {};

  const channel = supabase
    .channel("hub-cards")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "cards" },
      (payload) => {
        onInsert(payload.new as HubCard);
      },
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
