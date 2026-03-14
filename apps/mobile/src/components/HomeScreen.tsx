import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { loadStats, type QuizStats } from "@leafready/core";
import { asyncStorageAdapter } from "../lib/asyncStorageAdapter";
import { t, getLocale, setLocale, type Locale } from "../lib/i18n";
import Logo from "./Logo";

const PRACTICE_SIZES = [40, 60, 80, 100];

export default function HomeScreen() {
  const router = useRouter();
  const [locale, setCurrentLocale] = useState<Locale>(getLocale());
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [showPractice, setShowPractice] = useState(false);

  useEffect(() => {
    loadStats(asyncStorageAdapter).then(setStats);
  }, []);

  const toggleLocale = () => {
    const next: Locale = locale === "en" ? "fr" : "en";
    setLocale(next);
    setCurrentLocale(next);
  };

  const startQuiz = () => router.push("/quiz");
  const startPractice = (size: number) =>
    router.push({ pathname: "/quiz", params: { size, practice: "true" } });

  const avgScore =
    stats && stats.totalQuestions > 0
      ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
      : null;

  return (
    <SafeAreaView className="flex-1 bg-stone-50 dark:bg-gray-900">
      <ScrollView contentContainerClassName="px-4 py-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Logo size={28} />
          <TouchableOpacity
            onPress={toggleLocale}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600"
          >
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {locale === "en" ? "FR" : "EN"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View className="mb-8">
          <Text className="text-3xl font-black text-gray-900 dark:text-white mb-2">
            {t("app.title")}
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {t("app.subtitle")}
          </Text>
        </View>

        {/* Quiz info card */}
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <View className="flex-row gap-6 mb-5">
            <View className="items-center">
              <Text className="text-2xl font-black text-red-600">20</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                questions
              </Text>
            </View>
            <View className="w-px bg-gray-200 dark:bg-gray-700" />
            <View className="items-center">
              <Text className="text-2xl font-black text-red-600">45</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                min
              </Text>
            </View>
            <View className="w-px bg-gray-200 dark:bg-gray-700" />
            <View className="items-center">
              <Text className="text-2xl font-black text-red-600">75%</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                to pass
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={startQuiz}
            className="bg-red-600 rounded-xl py-4 items-center"
          >
            <Text className="text-white font-bold text-base">
              {t("app.startQuiz")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Practice mode */}
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <Text className="text-base font-bold text-gray-900 dark:text-white mb-1">
            {t("app.practiceTitle")}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {t("app.practiceDescription")}
          </Text>

          {!showPractice ? (
            <TouchableOpacity
              onPress={() => setShowPractice(true)}
              className="border border-gray-300 dark:border-gray-600 rounded-xl py-3 items-center"
            >
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("app.startPractice")}
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row flex-wrap gap-2">
              {PRACTICE_SIZES.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => startPractice(size)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl py-3 items-center"
                >
                  <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {size} Q
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Stats */}
        {stats && stats.totalQuizzes > 0 && (
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
              {t("stats.title")}
            </Text>
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-2xl font-black text-gray-900 dark:text-white">
                  {stats.totalQuizzes}
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                  {t("stats.quizzesTaken")}
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-black text-gray-900 dark:text-white">
                  {avgScore}%
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                  {t("stats.averageScore")}
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-black text-gray-900 dark:text-white">
                  {stats.bestScore}/20
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                  {t("stats.bestScore")}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
