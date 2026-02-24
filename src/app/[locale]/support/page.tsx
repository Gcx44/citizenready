import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShareButton from "@/components/ShareButton";

const KOFI_URL = "https://ko-fi.com/gcx44";
const PAYPAL_URL = "https://paypal.me/gclass44980";
const GITHUB_URL = "https://github.com/Gcx44/leafready";

export default function SupportPage() {
  const t = useTranslations("support");
  const tApp = useTranslations("app");

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href=".."
            className="font-bold text-red-700 dark:text-red-400 text-lg"
          >
            LeafReady
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10 flex flex-col gap-6">
        {/* Hero */}
        <div className="text-center space-y-2">
          <div className="text-4xl mb-2">☕</div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Financial support */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
            {t("financialTitle")}
          </h2>
          <div className="flex flex-col gap-3">
            <a
              href={KOFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all"
            >
              <span className="text-2xl">☕</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                  Ko-fi
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  ko-fi.com/gcx44
                </p>
              </div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                {t("kofi")} →
              </span>
            </a>

            <a
              href={PAYPAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all"
            >
              <span className="text-2xl">💳</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                  PayPal
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  paypal.me/gclass44980
                </p>
              </div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                {t("paypal")} →
              </span>
            </a>
          </div>
        </div>

        {/* Free ways to help */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
            {t("freeTitle")}
          </h2>
          <div className="flex flex-col gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all"
            >
              <span className="text-2xl">⭐</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                  {t("starTitle")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {t("starDescription")}
                </p>
              </div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400 shrink-0">
                {t("starButton")} →
              </span>
            </a>

            <ShareButton />
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 dark:text-gray-500">
          {t("thankYou")}
        </p>

        <Link
          href=".."
          className="text-center text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          ← {tApp("startQuiz")}
        </Link>
      </main>
    </div>
  );
}
