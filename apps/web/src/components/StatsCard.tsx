"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { loadStats, type QuizStats } from "@leafready/core";
import { localStorageAdapter } from "@/lib/localStorageAdapter";

export default function StatsCard() {
  const t = useTranslations("stats");
  const [stats, setStats] = useState<QuizStats | null>(null);

  useEffect(() => {
    loadStats(localStorageAdapter).then(setStats);
  }, []);

  if (!stats || stats.totalQuizzes === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
        {t("noStats")}
      </p>
    );
  }

  const avgScore = Math.round(
    (stats.totalCorrect / stats.totalQuestions) * 100,
  );

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {stats.totalQuizzes}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {t("quizzesTaken")}
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {avgScore}%
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {t("averageScore")}
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {stats.bestScore}/20
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {t("bestScore")}
        </p>
      </div>
    </div>
  );
}
