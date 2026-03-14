import questionsData from "./questions.json";
import type { Question, StorageAdapter } from "./types";

const SEEN_KEY = "citoyentest_seen";
const MAX_SEEN = 60;

async function getSeenIds(storage: StorageAdapter): Promise<Set<number>> {
  try {
    const raw = await storage.getItem(SEEN_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

async function markAsSeen(
  storage: StorageAdapter,
  ids: number[],
): Promise<void> {
  try {
    const raw = await storage.getItem(SEEN_KEY);
    const prev: number[] = JSON.parse(raw ?? "[]");
    const updated = [...prev, ...ids].slice(-MAX_SEEN);
    await storage.setItem(SEEN_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

/** Randomly pick `count` questions, prioritising ones not seen recently. */
export async function selectQuestions(
  count: number,
  storage: StorageAdapter,
): Promise<Question[]> {
  const seenIds = await getSeenIds(storage);
  const total = (questionsData as Question[]).length;
  const target = Math.min(count, total);

  const unseen = (questionsData as Question[]).filter(
    (q) => !seenIds.has(q.id),
  );
  const seen = (questionsData as Question[]).filter((q) => seenIds.has(q.id));

  const shuffle = <T>(arr: T[]): T[] =>
    [...arr].sort(() => Math.random() - 0.5);

  const selected = [...shuffle(unseen), ...shuffle(seen)].slice(0, target);
  await markAsSeen(
    storage,
    selected.map((q) => q.id),
  );
  return selected;
}

/** Calculate score: number of correct answers. */
export function calculateScore(
  questions: Question[],
  answers: (number | null)[],
  locale: "en" | "fr",
): number {
  return answers.reduce<number>((score, answer, i) => {
    if (answer === null) return score;
    return answer === questions[i][locale].answer ? score + 1 : score;
  }, 0);
}
