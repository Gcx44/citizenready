import questionsData from "@/data/questions.json";

export type Question = (typeof questionsData)[0];

const SEEN_KEY = "citoyentest_seen";
// Keep track of the last 3 quizzes worth of seen IDs (60 questions)
const MAX_SEEN = 60;

function getSeenIds(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function markAsSeen(ids: number[]): void {
  if (typeof window === "undefined") return;
  try {
    const prev: number[] = JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]");
    const updated = [...prev, ...ids].slice(-MAX_SEEN);
    localStorage.setItem(SEEN_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

/** Randomly pick `count` questions, prioritising ones not seen recently. */
export function selectQuestions(count: number): Question[] {
  const seenIds = getSeenIds();
  const total = questionsData.length;
  const target = Math.min(count, total);

  const unseen = questionsData.filter((q) => !seenIds.has(q.id));
  const seen = questionsData.filter((q) => seenIds.has(q.id));

  const shuffle = <T>(arr: T[]): T[] =>
    [...arr].sort(() => Math.random() - 0.5);

  const selected = [...shuffle(unseen), ...shuffle(seen)].slice(0, target);
  markAsSeen(selected.map((q) => q.id));
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
