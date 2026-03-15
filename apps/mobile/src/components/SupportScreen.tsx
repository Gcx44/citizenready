import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { t } from "../lib/i18n";

const KOFI_URL = "https://ko-fi.com/leafready";
const GITHUB_URL = "https://github.com/Gcx44/leafready";

export default function SupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-stone-50 dark:bg-gray-900">
      <ScrollView contentContainerClassName="px-4 py-6 max-w-lg w-full self-center">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600"
          >
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              ← {t("support.backHome")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text className="text-2xl font-black text-gray-900 dark:text-white mb-1">
          {t("support.title")}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          {t("support.subtitle")}
        </Text>

        {/* Ko-fi */}
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <Text className="text-base font-bold text-gray-900 dark:text-white mb-4">
            {t("support.financialTitle")}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(KOFI_URL)}
            className="bg-red-600 rounded-xl py-3 items-center"
          >
            <Text className="text-white font-semibold">
              {t("support.kofi")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Free ways */}
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <Text className="text-base font-bold text-gray-900 dark:text-white mb-4">
            {t("support.freeTitle")}
          </Text>

          {/* GitHub star */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              {t("support.starTitle")}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {t("support.starDescription")}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(GITHUB_URL)}
              className="border border-gray-300 dark:border-gray-600 rounded-xl py-3 items-center"
            >
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("support.starButton")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Share */}
          <View>
            <Text className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              {t("support.shareTitle")}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {t("support.shareDescription")}
            </Text>
          </View>
        </View>

        <Text className="text-center text-sm text-gray-400 dark:text-gray-500 mt-2">
          {t("support.thankYou")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
