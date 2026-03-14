"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface TimerProps {
  totalSeconds: number;
  onExpire: () => void;
  paused?: boolean;
}

export default function Timer({
  totalSeconds,
  onExpire,
  paused = false,
}: TimerProps) {
  const t = useTranslations("quiz");
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (paused || remaining <= 0) return;

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [paused, onExpire]); // eslint-disable-line react-hooks/exhaustive-deps

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isUrgent = remaining < 300; // last 5 minutes

  return (
    <div
      className={`flex items-center gap-2 text-sm font-mono font-semibold ${
        isUrgent
          ? "text-red-600 dark:text-red-400"
          : "text-gray-600 dark:text-gray-400"
      }`}
      aria-label={`${t("timeRemaining")}: ${minutes}:${String(seconds).padStart(2, "0")}`}
    >
      <svg
        className={`w-4 h-4 ${isUrgent ? "animate-pulse" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
