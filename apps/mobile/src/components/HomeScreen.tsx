import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { loadStats, type QuizStats } from "@leafready/core";
import { asyncStorageAdapter } from "../lib/asyncStorageAdapter";
import { t, getLocale, setLocale, type Locale } from "../lib/i18n";
import Logo from "./Logo";

const PRACTICE_SIZES = [40, 60, 80, 100];

const GUIDE_URL_EN =
  "https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/pub/discover.pdf";
const GUIDE_URL_FR =
  "https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/pub/decouvrir.pdf";

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
      <ScrollView contentContainerClassName="px-4 pt-4 pb-6 max-w-lg w-full self-center">
        {/* Header — logo centré, bouton langue à droite en absolu */}
        <View className="items-center mb-2 relative">
          <View style={{ marginTop: 28 }}>
            <Logo size={44} />
          </View>
          <TouchableOpacity
            onPress={toggleLocale}
            className="absolute right-0 top-0 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600"
          >
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {locale === "en" ? "FR" : "EN"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text className="text-sm text-center text-gray-500 dark:text-gray-400 leading-relaxed mb-6 px-2">
          {t("app.description")}
        </Text>

        {/* Quiz info card */}
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <View className="flex-row justify-around mb-5">
            <View className="items-center">
              <Text className="text-2xl font-black text-red-600">20</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                questions
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-black text-red-600">45</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                min
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-black text-red-600">75%</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
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
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
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
                  <Text className="text-sm font-bold text-red-600">{size}</Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    questions
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Official guide download */}
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <Text className="text-base font-bold text-gray-900 dark:text-white mb-1">
            {t("app.downloadGuide")}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {locale === "en"
              ? 'Official "Discover Canada" guide published by the Government of Canada.'
              : "Guide officiel « Découvrir le Canada » publié par le gouvernement du Canada."}
          </Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => Linking.openURL(GUIDE_URL_EN)}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl py-3 items-center"
            >
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("app.studyGuideEn")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(GUIDE_URL_FR)}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl py-3 items-center"
            >
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("app.studyGuideFr")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        {stats && stats.totalQuizzes > 0 && (
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
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

        {/* Footer links */}
        <View className="flex-row justify-center gap-6 py-2">
          <TouchableOpacity onPress={() => router.push("/faq")}>
            <Text className="text-sm text-gray-400 dark:text-gray-500">
              FAQ
            </Text>
          </TouchableOpacity>
          <Text className="text-gray-300 dark:text-gray-600">·</Text>
          <TouchableOpacity onPress={() => router.push("/support")}>
            <Text className="text-sm text-gray-400 dark:text-gray-500">
              {t("support.title")}
            </Text>
          </TouchableOpacity>
          <Text className="text-gray-300 dark:text-gray-600">·</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://github.com/Gcx44/leafready")
            }
          >
            <Text className="text-sm text-gray-400 dark:text-gray-500">
              GitHub
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
