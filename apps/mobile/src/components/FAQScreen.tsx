import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { t } from "../lib/i18n";

const FAQ_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export default function FAQScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-stone-50 dark:bg-gray-900">
      <ScrollView contentContainerClassName="px-4 py-6 max-w-lg w-full self-center">
        {/* Header */}
        <View className="flex-row items-center mb-6 gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600"
          >
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              ← {t("faq.backHome")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text className="text-2xl font-black text-gray-900 dark:text-white mb-1">
          {t("faq.title")}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          {t("faq.subtitle")}
        </Text>

        {/* FAQ items */}
        <View className="gap-4">
          {FAQ_ITEMS.map((n) => (
            <View
              key={n}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <Text className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                {t(`faq.q${n}`)}
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t(`faq.a${n}`)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
