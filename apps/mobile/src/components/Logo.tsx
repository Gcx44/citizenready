import React from "react";
import { View, Text } from "react-native";
import Svg, {
  Path,
  Polyline,
  Defs,
  RadialGradient,
  Stop,
  Filter,
  FeDropShadow,
} from "react-native-svg";

interface LogoProps {
  size?: number;
  hideText?: boolean;
}

export default function Logo({ size = 22, hideText = false }: LogoProps) {
  return (
    <View className="flex-row items-center gap-2">
      <Svg
        viewBox="0 0 36 36"
        width={size}
        height={size}
        accessibilityElementsHidden
      >
        <Defs>
          <RadialGradient
            id="leafGrad"
            cx="42%"
            cy="32%"
            r="62%"
            gradientUnits="userSpaceOnUse"
            fx="42%"
            fy="32%"
          >
            <Stop offset="0%" stopColor="#F04848" />
            <Stop offset="100%" stopColor="#A81414" />
          </RadialGradient>
          <Filter id="shadow" x="-15%" y="-15%" width="130%" height="130%">
            <FeDropShadow
              dx={0}
              dy={1.5}
              stdDeviation={1.5}
              floodColor="#00000055"
            />
          </Filter>
        </Defs>
        <Path
          fill="url(#leafGrad)"
          filter="url(#shadow)"
          d="M36 20.917c0-.688-2.895-.5-3.125-1s3.208-4.584 2.708-5.5-5.086 1.167-5.375.708c-.288-.458.292-3.5-.208-3.875s-5.25 4.916-5.917 4.292c-.666-.625 1.542-10.5 1.086-10.698-.456-.198-3.419 1.365-3.793 1.282C21.002 6.042 18.682 0 18 0s-3.002 6.042-3.376 6.125c-.374.083-3.337-1.48-3.793-1.282-.456.198 1.752 10.073 1.085 10.698C11.25 16.166 6.5 10.875 6 11.25s.08 3.417-.208 3.875c-.289.458-4.875-1.625-5.375-.708s2.939 5 2.708 5.5-3.125.312-3.125 1 8.438 5.235 9 5.771c.562.535-2.914 2.802-2.417 3.229.576.496 3.839-.83 10.417-.957V35c0 .553.448 1 1 1 .553 0 1-.447 1-1v-6.04c6.577.127 9.841 1.453 10.417.957.496-.428-2.979-2.694-2.417-3.229.562-.536 9-5.084 9-5.771z"
        />
        <Polyline
          points="11,20 15.5,25 25.5,13"
          fill="none"
          stroke="white"
          strokeWidth={2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.92}
        />
      </Svg>
      {!hideText && (
        <Text className="font-bold text-red-700 dark:text-red-400 text-2xl">
          LeafReady
        </Text>
      )}
    </View>
  );
}
