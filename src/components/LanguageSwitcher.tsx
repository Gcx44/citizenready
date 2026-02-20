"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("app");
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale = locale === "en" ? "fr" : "en";

  const handleSwitch = () => {
    // Replace current locale prefix in the path
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <button
        onClick={handleSwitch}
        className="text-sm font-medium text-gray-600 hover:text-red-700 dark:text-gray-400 dark:hover:text-red-400 transition-colors border border-gray-300 hover:border-red-300 dark:border-gray-600 dark:hover:border-red-500 rounded-md px-3 py-1.5"
        aria-label={`${t("language")} : ${otherLocale.toUpperCase()}`}
      >
        {otherLocale === "fr" ? "Français" : "English"}
      </button>
    </div>
  );
}
