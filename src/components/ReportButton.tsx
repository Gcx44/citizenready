"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { type Question } from "@/lib/quiz";

interface ReportButtonProps {
  question: Question;
  locale: "en" | "fr";
}

const REPO = "Gcx44/citizenready";

const ISSUE_OPTIONS = [
  "wrongAnswer",
  "unclearQuestion",
  "translationError",
  "other",
] as const;

export default function ReportButton({ question, locale }: ReportButtonProps) {
  const t = useTranslations("report");
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [details, setDetails] = useState("");

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleSubmit = () => {
    const data = question[locale];
    const problems = [...checked]
      .map((k) => `- ${t(k as (typeof ISSUE_OPTIONS)[number])}`)
      .join("\n");

    const title = `[Report] Question #${question.id}`;
    const body = [
      `## Question report`,
      ``,
      `**ID:** #${question.id}`,
      `**Language:** ${locale.toUpperCase()}`,
      `**Question:** ${data.question}`,
      ``,
      `## Problem`,
      problems || "- (not specified)",
      details ? `\n## Additional details\n${details}` : "",
    ]
      .join("\n")
      .trim();

    const url = `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=question-report`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setChecked(new Set());
    setDetails("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        title={t("title")}
      >
        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
            clipRule="evenodd"
          />
        </svg>
        {t("button")}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-sm p-5">
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-1">
              {t("title")}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              #{question.id} — {question[locale].question.slice(0, 60)}…
            </p>

            <div className="space-y-2 mb-4">
              {ISSUE_OPTIONS.map((key) => (
                <label
                  key={key}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={checked.has(key)}
                    onChange={() => toggle(key)}
                    className="w-4 h-4 accent-red-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    {t(key)}
                  </span>
                </label>
              ))}
            </div>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={t("placeholder")}
              rows={3}
              className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none mb-4"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSubmit}
                disabled={checked.size === 0 && details.trim() === ""}
                className="flex-1 py-2 text-sm bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                {t("submit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
