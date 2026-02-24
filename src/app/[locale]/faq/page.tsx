import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: `${t("title")} — LeafReady`,
    description: t("subtitle"),
  };
}

const faqs = [
  { q: "q1", a: "a1" },
  { q: "q2", a: "a2" },
  { q: "q3", a: "a3" },
  { q: "q4", a: "a4" },
  { q: "q5", a: "a5" },
  { q: "q6", a: "a6" },
  { q: "q7", a: "a7" },
  { q: "q8", a: "a8" },
] as const;

export default function FaqPage() {
  const t = useTranslations("faq");

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-red-700 dark:text-red-400 text-lg"
          >
            LeafReady
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-2">
            {t("title")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div
              key={q}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5"
            >
              <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                {t(q)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {t(a)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:underline font-medium"
          >
            ← {t("backHome")}
          </Link>
        </div>
      </main>
    </div>
  );
}
