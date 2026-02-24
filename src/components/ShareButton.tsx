"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const APP_URL = "https://leafready.ca";

export default function ShareButton() {
  const t = useTranslations("support");
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "LeafReady",
          text: t("shareText"),
          url: APP_URL,
        });
      } catch {
        // user cancelled, do nothing
      }
    } else {
      await navigator.clipboard.writeText(APP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all text-left"
    >
      <span className="text-2xl">📤</span>
      <div className="flex-1">
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
          {t("shareTitle")}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {t("shareDescription")}
        </p>
      </div>
      <span className="text-sm font-medium text-red-600 dark:text-red-400 shrink-0">
        {copied ? t("shareCopied") : t("shareButton")}
      </span>
    </button>
  );
}
