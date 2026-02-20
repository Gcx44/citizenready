"use client";

import { useTranslations } from "next-intl";
import { calculateScore, type Question } from "@/lib/quiz";

interface ResultsViewProps {
  questions: Question[];
  answers: (number | null)[];
  locale: "en" | "fr";
  timeExpired: boolean;
  stoppedEarly?: boolean;
  isPractice?: boolean;
  onRestart: () => void;
  onHome: () => void;
}

export default function ResultsView({
  questions,
  answers,
  locale,
  timeExpired,
  stoppedEarly = false,
  isPractice = false,
  onRestart,
  onHome,
}: ResultsViewProps) {
  const t = useTranslations("results");
  const tCat = useTranslations("categories");

  const score = calculateScore(questions, answers, locale);
  const total = questions.length;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 75;

  const pdfFile = locale === "en" ? "discover.pdf" : "decouvrir.pdf";

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-900">
      {/* Score header */}
      <div
        className={`${passed ? "bg-green-600 dark:bg-green-700" : "bg-red-700 dark:bg-red-800"} text-white py-10 px-4`}
      >
        <div className="max-w-2xl mx-auto text-center">
          {timeExpired && (
            <p className="text-sm uppercase tracking-widest opacity-80 mb-2">
              {t("timeExpired")}
            </p>
          )}
          {stoppedEarly && (
            <p className="text-sm uppercase tracking-widest opacity-80 mb-2">
              {t("stoppedEarly")}
            </p>
          )}
          <h1 className="text-2xl font-bold mb-1">{t("title")}</h1>
          <p className="text-6xl font-black my-4">
            {score}/{total}
          </p>
          <p className="text-xl font-semibold opacity-90">
            {percentage}% —{" "}
            <span className="font-bold">
              {passed ? t("passed") : t("failed")}
            </span>
          </p>
          <p className="text-sm opacity-70 mt-2">
            {isPractice ? t("passNotePractice") : t("passNote")}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="max-w-2xl mx-auto px-4 py-6 flex gap-3">
        <button
          onClick={onRestart}
          className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          {t("playAgain")}
        </button>
        <button
          onClick={onHome}
          className="flex-1 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors"
        >
          {t("goHome")}
        </button>
      </div>

      {/* Question review */}
      <div className="max-w-2xl mx-auto px-4 pb-10">
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">
          {t("reviewTitle")}
        </h2>

        <div className="space-y-4">
          {questions.map((q, idx) => {
            const data = q[locale];
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === data.answer;
            const isSkipped = userAnswer === null;

            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border-l-4 p-4 shadow-sm ${
                  isSkipped
                    ? "border-gray-300 dark:border-gray-500"
                    : isCorrect
                      ? "border-green-500"
                      : "border-red-400"
                }`}
              >
                {/* Status badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                    #{idx + 1} ·{" "}
                    {tCat(q.category as Parameters<typeof tCat>[0])}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isSkipped
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        : isCorrect
                          ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {isSkipped
                      ? t("skipped")
                      : isCorrect
                        ? t("correct")
                        : t("incorrect")}
                  </span>
                </div>

                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
                  {data.question}
                </p>

                {/* Choices */}
                <div className="space-y-1.5">
                  {data.choices.map((choice, i) => {
                    const isUserChoice = i === userAnswer;
                    const isCorrectChoice = i === data.answer;

                    let choiceClass =
                      "text-xs px-3 py-2 rounded-md w-full text-left ";
                    if (isCorrectChoice) {
                      choiceClass +=
                        "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium";
                    } else if (isUserChoice && !isCorrect) {
                      choiceClass +=
                        "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 line-through";
                    } else {
                      choiceClass += "text-gray-500 dark:text-gray-400";
                    }

                    return (
                      <div key={i} className={choiceClass}>
                        <span className="font-bold mr-1.5">
                          {["A", "B", "C", "D"][i]}.
                        </span>
                        {choice}
                        {isCorrectChoice && (
                          <span className="ml-1 text-green-600 dark:text-green-400">
                            ✓
                          </span>
                        )}
                        {isUserChoice && !isCorrect && (
                          <span className="ml-1 text-red-500 dark:text-red-400">
                            ✗
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Source link */}
                <a
                  href={`/documents/${pdfFile}#page=${q.source[`page_${locale}`]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  {t("source")} : {q.source[`section_${locale}`]} ({t("page")}{" "}
                  {q.source[`page_${locale}`]})
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
