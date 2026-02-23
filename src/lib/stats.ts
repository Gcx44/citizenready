const STATS_KEY = "leafready_stats";

export interface QuizStats {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  bestScore: number;
}

export function loadStats(): QuizStats | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? (JSON.parse(raw) as QuizStats) : null;
  } catch {
    return null;
  }
}

export function saveStats(correct: number, total: number): void {
  if (typeof window === "undefined") return;
  const prev = loadStats();
  const updated: QuizStats = {
    totalQuizzes: (prev?.totalQuizzes ?? 0) + 1,
    totalCorrect: (prev?.totalCorrect ?? 0) + correct,
    totalQuestions: (prev?.totalQuestions ?? 0) + total,
    bestScore: Math.max(prev?.bestScore ?? 0, correct),
  };
  localStorage.setItem(STATS_KEY, JSON.stringify(updated));
}

export function clearStats(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STATS_KEY);
}
