import type { QuizStats, StorageAdapter } from "./types";

const STATS_KEY = "leafready_stats";

export async function loadStats(
  storage: StorageAdapter,
): Promise<QuizStats | null> {
  try {
    const raw = await storage.getItem(STATS_KEY);
    return raw ? (JSON.parse(raw) as QuizStats) : null;
  } catch {
    return null;
  }
}

export async function saveStats(
  storage: StorageAdapter,
  correct: number,
  total: number,
): Promise<void> {
  const prev = await loadStats(storage);
  const updated: QuizStats = {
    totalQuizzes: (prev?.totalQuizzes ?? 0) + 1,
    totalCorrect: (prev?.totalCorrect ?? 0) + correct,
    totalQuestions: (prev?.totalQuestions ?? 0) + total,
    bestScore: Math.max(prev?.bestScore ?? 0, correct),
  };
  await storage.setItem(STATS_KEY, JSON.stringify(updated));
}

export async function clearStats(storage: StorageAdapter): Promise<void> {
  await storage.removeItem?.(STATS_KEY);
}
