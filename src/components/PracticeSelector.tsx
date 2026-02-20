"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

const PRACTICE_SIZES = [40, 60, 80, 100] as const;

export default function PracticeSelector() {
  const t = useTranslations("app");
  const locale = useLocale();
  const router = useRouter();
  const [size, setSize] = useState<number>(40);

  const handleStart = () => {
    router.push(`/${locale}/quiz?n=${size}&practice=true`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
      <h2 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
        {t("practiceTitle")}
      </h2>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        {t("practiceDescription")}
      </p>
      <div className="flex gap-3 items-center">
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="flex-1 py-2.5 px-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          {PRACTICE_SIZES.map((n) => (
            <option key={n} value={n}>
              {n} questions
            </option>
          ))}
        </select>
        <button
          onClick={handleStart}
          className="px-5 py-2.5 bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
        >
          {t("startPractice")} →
        </button>
      </div>
    </div>
  );
}
