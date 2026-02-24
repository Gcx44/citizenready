import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import StatsCard from "@/components/StatsCard";
import PracticeSelector from "@/components/PracticeSelector";

export default function HomePage() {
  const t = useTranslations("app");
  const tStats = useTranslations("stats");

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-900 flex flex-col">
      {/* Nav */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="font-bold text-red-700 dark:text-red-400 text-lg">
            LeafReady
          </span>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10 flex flex-col gap-6">
        {/* Hero */}
        <div className="text-center space-y-3">
          {/* Maple leaf icon */}
          <div className="flex justify-center mb-4">
            <svg
              viewBox="0 0 36 36"
              className="w-16 h-16"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#D42B2B"
                d="M36 20.917c0-.688-2.895-.5-3.125-1s3.208-4.584 2.708-5.5-5.086 1.167-5.375.708c-.288-.458.292-3.5-.208-3.875s-5.25 4.916-5.917 4.292c-.666-.625 1.542-10.5 1.086-10.698-.456-.198-3.419 1.365-3.793 1.282C21.002 6.042 18.682 0 18 0s-3.002 6.042-3.376 6.125c-.374.083-3.337-1.48-3.793-1.282-.456.198 1.752 10.073 1.085 10.698C11.25 16.166 6.5 10.875 6 11.25s.08 3.417-.208 3.875c-.289.458-4.875-1.625-5.375-.708s2.939 5 2.708 5.5-3.125.312-3.125 1 8.438 5.235 9 5.771c.562.535-2.914 2.802-2.417 3.229.576.496 3.839-.83 10.417-.957V35c0 .553.448 1 1 1 .553 0 1-.447 1-1v-6.04c6.577.127 9.841 1.453 10.417.957.496-.428-2.979-2.694-2.417-3.229.562-.536 9-5.084 9-5.771z"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-lg font-medium text-red-700 dark:text-red-400">
            {t("subtitle")}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Quiz info cards */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { value: "20", label: "questions" },
            { value: "45 min", label: "chrono" },
            { value: "75%", label: "to pass" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 py-4 shadow-sm"
            >
              <p className="text-xl font-black text-red-600 dark:text-red-400">
                {value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Start button */}
        <Link
          href="quiz"
          className="block text-center w-full py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          {t("startQuiz")} →
        </Link>

        {/* Practice mode */}
        <PracticeSelector />

        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-4">
            <span className="text-gray-400 dark:text-gray-500">
              {tStats("title")}
            </span>
          </h2>
          <StatsCard />
        </div>

        {/* Official guide download */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
            {t("downloadGuide")}
          </h2>
          <div className="flex gap-3">
            <a
              href="/documents/discover.pdf"
              target="_blank"
              className="flex-1 text-center py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
            >
              🇬🇧 {t("studyGuideEn")}
            </a>
            <a
              href="/documents/decouvrir.pdf"
              target="_blank"
              className="flex-1 text-center py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
            >
              🇫🇷 {t("studyGuideFr")}
            </a>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-gray-400 dark:text-gray-500 space-y-1">
        <div>
          <a
            href="https://github.com/Gcx44/leafready"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 dark:hover:text-gray-300"
          >
            GitHub
          </a>
          {" · "}
          <Link
            href="support"
            className="underline hover:text-gray-600 dark:hover:text-gray-300"
          >
            ☕ Support
          </Link>
        </div>
        <div>
          Open source · Based on the official{" "}
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 dark:hover:text-gray-300"
          >
            Discover Canada
          </a>{" "}
          guide · Not affiliated with the Government of Canada
        </div>
      </footer>
    </div>
  );
}
