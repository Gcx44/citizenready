import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: "Privacy Policy",
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        "en-CA": "/en/privacy",
        "fr-CA": "/fr/privacy",
        "x-default": "/en/privacy",
      },
    },
  };
}

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="..">
            <Logo />
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {t("lastUpdated")}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t("section1Title")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {t("section1Content")}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t("section2Title")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {t("section2Content")}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t("section3Title")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {t("section3Content")}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t("section4Title")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {t("section4Content")}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t("contactTitle")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {t("contactContent")}{" "}
              <a
                href="mailto:mycssrv@gmail.com"
                className="text-red-600 dark:text-red-400 hover:underline"
              >
                mycssrv@gmail.com
              </a>
            </p>
          </div>
        </div>

        <Link
          href=".."
          className="text-center text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          ← {t("backHome")}
        </Link>
      </main>
    </div>
  );
}
