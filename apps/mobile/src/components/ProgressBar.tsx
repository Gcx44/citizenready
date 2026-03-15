import React from "react";
import { View } from "react-native";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <View className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <View
        className="h-full bg-red-600 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </View>
  );
}
