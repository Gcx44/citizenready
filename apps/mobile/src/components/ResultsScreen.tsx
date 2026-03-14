import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateScore, type Question } from "@leafready/core";
import { t } from "../lib/i18n";

const CATEGORIES: Record<string, string> = {
  rights_responsibilities: "Rights & Resp.",
  who_we_are: "Who We Are",
  history_aboriginal: "Aboriginal History",
  history_european: "European History",
  modern_canada: "Modern Canada",
  government: "Government",
  federal_elections: "Elections",
  justice_system: "Justice",
  symbols: "Symbols",
  economy: "Economy",
  regions: "Regions",
};

interface ResultsScreenProps {
  questions: Question[];
  answers: (number | null)[];
  locale: "en" | "fr";
  timeExpired: boolean;
  stoppedEarly?: boolean;
  isPractice?: boolean;
  onRestart: () => void;
  onHome: () => void;
}

export default function ResultsScreen({
  questions,
  answers,
  locale,
  timeExpired,
  stoppedEarly = false,
  isPractice = false,
  onRestart,
  onHome,
}: ResultsScreenProps) {
  const score = calculateScore(questions, answers, locale);
  const total = questions.length;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 75;

  return (
    <SafeAreaView className="flex-1 bg-stone-50 dark:bg-gray-900">
      <ScrollView>
        {/* Score header */}
        <View
          className={`${passed ? "bg-green-600" : "bg-red-700"} py-10 px-4`}
        >
          <View className="items-center">
            {timeExpired && (
              <Text className="text-xs text-white/80 uppercase tracking-widest mb-2">
                {t("results.timeExpired")}
              </Text>
            )}
            {stoppedEarly && (
              <Text className="text-xs text-white/80 uppercase tracking-widest mb-2">
                {t("results.stoppedEarly")}
              </Text>
            )}
            <Text className="text-xl font-bold text-white mb-1">
              {t("results.title")}
            </Text>
            <Text className="text-6xl font-black text-white my-4">
              {score}/{total}
            </Text>
            <Text className="text-lg font-semibold text-white/90">
              {percentage}% —{" "}
              {passed ? t("results.passed") : t("results.failed")}
            </Text>
            <Text className="text-xs text-white/70 mt-2">
              {isPractice
                ? t("results.passNotePractice")
                : t("results.passNote")}
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View className="flex-row gap-3 px-4 py-5">
          <TouchableOpacity
            onPress={onRestart}
            className="flex-1 py-3 bg-red-600 rounded-xl items-center"
          >
            <Text className="text-white font-semibold">
              {t("results.playAgain")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onHome}
            className="flex-1 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl items-center"
          >
            <Text className="text-gray-700 dark:text-gray-200 font-semibold">
              {t("results.goHome")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Question review */}
        <View className="px-4 pb-10">
          <Text className="text-base font-bold text-gray-700 dark:text-gray-300 mb-4">
            {t("results.reviewTitle")}
          </Text>

          <View className="gap-4">
            {questions.map((q, idx) => {
              const data = q[locale];
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === data.answer;
              const isSkipped = userAnswer === null;

              const borderColor = isSkipped
                ? "border-l-gray-300"
                : isCorrect
                  ? "border-l-green-500"
                  : "border-l-red-400";

              return (
                <View
                  key={q.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl border-l-4 p-4 shadow-sm ${borderColor}`}
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <Text className="text-xs text-gray-400 dark:text-gray-500">
                      #{idx + 1} · {CATEGORIES[q.category] ?? q.category}
                    </Text>
                    <View
                      className={`px-2 py-0.5 rounded-full ${
                        isSkipped
                          ? "bg-gray-100 dark:bg-gray-700"
                          : isCorrect
                            ? "bg-green-100 dark:bg-green-900/40"
                            : "bg-red-100 dark:bg-red-900/40"
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold ${
                          isSkipped
                            ? "text-gray-500 dark:text-gray-400"
                            : isCorrect
                              ? "text-green-700 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {isSkipped
                          ? t("results.skipped")
                          : isCorrect
                            ? t("results.correct")
                            : t("results.incorrect")}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
                    {data.question}
                  </Text>

                  <View className="gap-1.5">
                    {data.choices.map((choice, i) => {
                      const isUserChoice = i === userAnswer;
                      const isCorrectChoice = i === data.answer;

                      let choiceClass = "px-3 py-2 rounded-xl ";
                      if (isCorrectChoice) {
                        choiceClass += "bg-green-50 dark:bg-green-900/30";
                      } else if (isUserChoice && !isCorrect) {
                        choiceClass += "bg-red-50 dark:bg-red-900/30";
                      }

                      return (
                        <View key={i} className={choiceClass}>
                          <Text
                            className={`text-xs ${
                              isCorrectChoice
                                ? "text-green-800 dark:text-green-300 font-medium"
                                : isUserChoice && !isCorrect
                                  ? "text-red-700 dark:text-red-400 line-through"
                                  : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            <Text className="font-bold">
                              {["A", "B", "C", "D"][i]}.{" "}
                            </Text>
                            {choice}
                            {isCorrectChoice ? " ✓" : ""}
                            {isUserChoice && !isCorrect ? " ✗" : ""}
                          </Text>
                        </View>
                      );
                    })}
                  </View>

                  <Text className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                    {t("results.source")}: {q.source[`section_${locale}`]} (p.{" "}
                    {q.source[`page_${locale}`]})
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
