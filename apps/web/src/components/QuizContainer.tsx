"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  selectQuestions,
  calculateScore,
  saveStats,
  type Question,
} from "@leafready/core";
import { localStorageAdapter } from "@/lib/localStorageAdapter";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import ResultsView from "./ResultsView";
import ReportButton from "./ReportButton";

type QuizStatus = "loading" | "playing" | "finished";

interface QuizState {
  status: QuizStatus;
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  selectedAnswer: number | null;
  timeExpired: boolean;
  stoppedEarly: boolean;
}

interface QuizContainerProps {
  quizSize?: number;
  isPractice?: boolean;
}

const DEFAULT_QUIZ_SIZE = 20;
const QUIZ_DURATION = 45 * 60;

const LOADING_STATE: QuizState = {
  status: "loading",
  questions: [],
  currentIndex: 0,
  answers: [],
  selectedAnswer: null,
  timeExpired: false,
  stoppedEarly: false,
};

export default function QuizContainer({
  quizSize = DEFAULT_QUIZ_SIZE,
  isPractice = false,
}: QuizContainerProps) {
  const t = useTranslations("quiz");
  const locale = useLocale() as "en" | "fr";
  const router = useRouter();

  const [state, setState] = useState<QuizState>(LOADING_STATE);

  const initQuiz = useCallback(async () => {
    setState(LOADING_STATE);
    const questions = await selectQuestions(quizSize, localStorageAdapter);
    setState({
      status: "playing",
      questions,
      currentIndex: 0,
      answers: new Array(questions.length).fill(null),
      selectedAnswer: null,
      timeExpired: false,
      stoppedEarly: false,
    });
  }, [quizSize]);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  // Save stats only for the official quiz (non-practice)
  useEffect(() => {
    if (state.status === "finished" && !isPractice) {
      const score = calculateScore(state.questions, state.answers, locale);
      saveStats(localStorageAdapter, score, state.questions.length);
    }
  }, [state.status]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRestart = useCallback(() => {
    initQuiz();
  }, [initQuiz]);

  const handleAnswer = useCallback(
    (choiceIndex: number) => {
      if (state.selectedAnswer !== null) return;
      setState((prev) => ({
        ...prev,
        selectedAnswer: choiceIndex,
        answers: prev.answers.map((a, i) =>
          i === prev.currentIndex ? choiceIndex : a,
        ),
      }));
    },
    [state.selectedAnswer],
  );

  const handleNext = useCallback(() => {
    setState((prev) => {
      const isLast = prev.currentIndex + 1 >= prev.questions.length;
      if (isLast) {
        return { ...prev, status: "finished", selectedAnswer: null };
      }
      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
      };
    });
  }, []);

  const handleTimeUp = useCallback(() => {
    setState((prev) => ({ ...prev, status: "finished", timeExpired: true }));
  }, []);

  const handleStop = useCallback(() => {
    setState((prev) => ({ ...prev, status: "finished", stoppedEarly: true }));
  }, []);

  if (state.status === "loading") {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">{t("loading")}</p>
      </div>
    );
  }

  if (state.status === "finished") {
    return (
      <ResultsView
        questions={state.questions}
        answers={state.answers}
        locale={locale}
        timeExpired={state.timeExpired}
        stoppedEarly={state.stoppedEarly}
        isPractice={isPractice}
        onRestart={handleRestart}
        onHome={() => router.push(`/${locale}`)}
      />
    );
  }

  const currentQuestion = state.questions[state.currentIndex];
  const currentData = currentQuestion[locale];
  const isAnswered = state.selectedAnswer !== null;
  const isLastQuestion = state.currentIndex + 1 >= state.questions.length;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-900 flex flex-col">
      {/* Header bar */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <ProgressBar
            current={state.currentIndex + 1}
            total={state.questions.length}
          />
          <div className="ml-4 shrink-0 flex items-center gap-3">
            {!isPractice && (
              <Timer totalSeconds={QUIZ_DURATION} onExpire={handleTimeUp} />
            )}
            <button
              onClick={handleStop}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {t("stop")}
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">
          {t("question")} {state.currentIndex + 1} {t("of")}{" "}
          {state.questions.length}
        </p>
      </header>

      {/* Question card */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 md:p-8 animate-fade-in">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 leading-snug">
            {currentData.question}
          </h2>

          <div className="space-y-3">
            {currentData.choices.map((choice, i) => {
              let className =
                "w-full text-left p-4 rounded-lg border-2 transition-all duration-150 text-sm md:text-base ";

              if (!isAnswered) {
                className +=
                  "border-gray-200 dark:border-gray-600 hover:border-red-300 hover:bg-red-50 dark:hover:border-red-500 dark:hover:bg-red-900/20 cursor-pointer text-gray-800 dark:text-gray-200";
              } else if (i === currentData.answer) {
                className +=
                  "border-green-500 bg-green-50 dark:bg-green-900/30 cursor-default text-gray-800 dark:text-gray-200";
              } else if (i === state.selectedAnswer) {
                className +=
                  "border-red-400 bg-red-50 dark:bg-red-900/30 cursor-default text-gray-800 dark:text-gray-200";
              } else {
                className +=
                  "border-gray-100 dark:border-gray-700 opacity-50 cursor-default text-gray-800 dark:text-gray-200";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={isAnswered}
                  className={className}
                >
                  <span className="font-bold text-gray-400 dark:text-gray-500 mr-2">
                    {["A", "B", "C", "D"][i]}.
                  </span>
                  {choice}

                  {isAnswered && i === currentData.answer && (
                    <span className="ml-2 text-green-600 font-bold">✓</span>
                  )}
                  {isAnswered &&
                    i === state.selectedAnswer &&
                    i !== currentData.answer && (
                      <span className="ml-2 text-red-500 font-bold">✗</span>
                    )}
                </button>
              );
            })}
          </div>

          {/* Feedback + next button */}
          {isAnswered && (
            <div className="mt-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm font-medium ${
                    state.selectedAnswer === currentData.answer
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  {state.selectedAnswer === currentData.answer
                    ? t("correct")
                    : t("incorrect")}
                </p>
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors"
                >
                  {isLastQuestion ? t("finish") : t("next")}
                </button>
              </div>
              <div className="mt-3 flex justify-end">
                <ReportButton question={currentQuestion} locale={locale} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
