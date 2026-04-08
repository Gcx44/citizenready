import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import StatsCard from "@/components/StatsCard";
import PracticeSelector from "@/components/PracticeSelector";
import Logo from "@/components/Logo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en-CA": "/en",
        "fr-CA": "/fr",
        "x-default": "/en",
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LeafReady",
  url: "https://leafready.ca",
  description:
    "Free bilingual practice quiz for the Canadian citizenship test. 385+ questions based on the official Discover Canada guide.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
  inLanguage: ["en-CA", "fr-CA"],
};

export default function HomePage() {
  const t = useTranslations("app");
  const tStats = useTranslations("stats");

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-900 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Nav */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Logo />
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10 flex flex-col gap-6">
        {/* Hero */}
        <div className="text-center space-y-3">
          {/* Maple leaf icon */}
          <div className="flex justify-center mb-4">
            <Logo size={64} hideText />
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

      <footer className="text-center pt-2 pb-6 px-4 space-y-3">
        {/* Mobile badges */}
        <div className="flex justify-center items-end gap-4 mb-3">
          <a
            href="https://apps.apple.com/ca/app/leafready/id6761668685"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/badges/app-store.svg"
              alt="Download on the App Store"
              className="h-10 w-auto"
            />
          </a>
          <div className="flex flex-col items-center gap-0.5">
            <div className="opacity-40 cursor-not-allowed">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/badges/google-play.png"
                alt="Get it on Google Play"
                className="h-10 w-auto"
              />
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {t("mobileComingSoon")}
            </span>
          </div>
        </div>

        <Link
          href="support"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
        >
          ☕ Support LeafReady
        </Link>
        <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
          <div>
            <Link
              href="faq"
              className="underline hover:text-gray-600 dark:hover:text-gray-300"
            >
              FAQ
            </Link>
            {" · "}
            <a
              href="https://github.com/Gcx44/leafready"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 dark:hover:text-gray-300"
            >
              GitHub
            </a>
            {" · "}
            Open source · Not affiliated with the Government of Canada
          </div>
          <div>
            Based on the official{" "}
            <a
              href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 dark:hover:text-gray-300"
            >
              Discover Canada
            </a>{" "}
            guide
          </div>
        </div>
      </footer>
    </div>
  );
}
