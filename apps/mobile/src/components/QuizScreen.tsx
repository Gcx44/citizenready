import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  selectQuestions,
  calculateScore,
  saveStats,
  type Question,
} from "@leafready/core";
import { asyncStorageAdapter } from "../lib/asyncStorageAdapter";
import { t, getLocale } from "../lib/i18n";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import ResultsScreen from "./ResultsScreen";

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

interface QuizScreenProps {
  quizSize?: number;
  isPractice?: boolean;
}

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

export default function QuizScreen({
  quizSize = 20,
  isPractice = false,
}: QuizScreenProps) {
  const router = useRouter();
  const locale = getLocale();
  const [state, setState] = useState<QuizState>(LOADING_STATE);

  const initQuiz = useCallback(async () => {
    setState(LOADING_STATE);
    const questions = await selectQuestions(quizSize, asyncStorageAdapter);
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

  // Save stats when quiz finishes (non-practice only)
  useEffect(() => {
    if (state.status === "finished" && !isPractice) {
      const score = calculateScore(state.questions, state.answers, locale);
      saveStats(asyncStorageAdapter, score, state.questions.length);
    }
  }, [state.status]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleTimeExpired = useCallback(() => {
    setState((prev) => ({ ...prev, status: "finished", timeExpired: true }));
  }, []);

  const handleNext = useCallback(() => {
    setState((prev) => {
      const isLast = prev.currentIndex + 1 >= prev.questions.length;
      if (isLast) return { ...prev, status: "finished", selectedAnswer: null };
      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
      };
    });
  }, []);

  if (state.status === "loading") {
    return (
      <SafeAreaView className="flex-1 bg-stone-50 dark:bg-gray-900 items-center justify-center">
        <Text className="text-gray-500 dark:text-gray-400">
          {t("quiz.loading")}
        </Text>
      </SafeAreaView>
    );
  }

  if (state.status === "finished") {
    return (
      <ResultsScreen
        questions={state.questions}
        answers={state.answers}
        locale={locale}
        timeExpired={state.timeExpired}
        stoppedEarly={state.stoppedEarly}
        isPractice={isPractice}
        onRestart={initQuiz}
        onHome={() => router.replace("/")}
      />
    );
  }

  const currentQuestion = state.questions[state.currentIndex];
  const currentData = currentQuestion[locale];
  const isAnswered = state.selectedAnswer !== null;
  const isLastQuestion = state.currentIndex + 1 >= state.questions.length;

  return (
    <SafeAreaView className="flex-1 bg-stone-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-1">
            <ProgressBar
              current={state.currentIndex + 1}
              total={state.questions.length}
            />
          </View>
          <View className="flex-row items-center gap-3 ml-4">
            {!isPractice && (
              <Timer
                totalSeconds={QUIZ_DURATION}
                onExpire={handleTimeExpired}
              />
            )}
            <TouchableOpacity
              onPress={() =>
                setState((prev) => ({
                  ...prev,
                  status: "finished",
                  stoppedEarly: true,
                }))
              }
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {t("quiz.stop")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-xs text-gray-400 dark:text-gray-500 text-center">
          {t("quiz.question")} {state.currentIndex + 1} {t("quiz.of")}{" "}
          {state.questions.length}
        </Text>
      </View>

      {/* Question */}
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
          <Text className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-5 leading-snug">
            {currentData.question}
          </Text>

          <View className="gap-3">
            {currentData.choices.map((choice, i) => {
              let baseClass =
                "p-4 rounded-xl border-2 flex-row items-center gap-2 ";

              if (!isAnswered) {
                baseClass +=
                  "border-gray-200 dark:border-gray-600 active:border-red-300 active:bg-red-50";
              } else if (i === currentData.answer) {
                baseClass +=
                  "border-green-500 bg-green-50 dark:bg-green-900/30";
              } else if (i === state.selectedAnswer) {
                baseClass += "border-red-400 bg-red-50 dark:bg-red-900/30";
              } else {
                baseClass += "border-gray-100 dark:border-gray-700 opacity-50";
              }

              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleAnswer(i)}
                  disabled={isAnswered}
                  className={baseClass}
                >
                  <Text className="font-bold text-gray-400 dark:text-gray-500 w-6">
                    {["A", "B", "C", "D"][i]}.
                  </Text>
                  <Text className="flex-1 text-sm text-gray-800 dark:text-gray-200">
                    {choice}
                  </Text>
                  {isAnswered && i === currentData.answer && (
                    <Text className="text-green-600 font-bold">✓</Text>
                  )}
                  {isAnswered &&
                    i === state.selectedAnswer &&
                    i !== currentData.answer && (
                      <Text className="text-red-500 font-bold">✗</Text>
                    )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Feedback */}
          {isAnswered && (
            <View className="mt-5 flex-row items-center justify-between">
              <Text
                className={`text-sm font-medium ${
                  state.selectedAnswer === currentData.answer
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {state.selectedAnswer === currentData.answer
                  ? t("quiz.correct")
                  : t("quiz.incorrect")}
              </Text>
              <TouchableOpacity
                onPress={handleNext}
                className="px-5 py-2.5 bg-red-600 rounded-xl"
              >
                <Text className="text-white font-semibold text-sm">
                  {isLastQuestion ? t("quiz.finish") : t("quiz.next")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
