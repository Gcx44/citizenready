import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ThemeProvider from "@/components/ThemeProvider";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: "LeafReady — Canadian Citizenship Test Practice",
      template: "%s | LeafReady",
    },
    description:
      "Free bilingual practice quiz for the Canadian citizenship test. 385+ questions based on the official Discover Canada guide. No account needed.",
    keywords: [
      "Canadian citizenship test",
      "citizenship practice quiz",
      "Discover Canada",
      "test de citoyenneté canadienne",
      "quiz citoyenneté",
      "Découvrir le Canada",
      "IRCC practice test",
      "citizenship exam prep",
      "Canada immigration test",
    ],
    icons: { icon: "/favicon.svg" },
    metadataBase: new URL("https://leafready.ca"),
    alternates: {
      languages: {
        "en-CA": "/en",
        "fr-CA": "/fr",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: "LeafReady — Canadian Citizenship Test Practice",
      description:
        "Free bilingual practice quiz for the Canadian citizenship test. 385+ questions based on the official Discover Canada guide.",
      url: `https://leafready.ca/${locale}`,
      siteName: "LeafReady",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "LeafReady — Canadian Citizenship Test Practice",
      description:
        "Free bilingual practice quiz for the Canadian citizenship test. 385+ questions, no account needed.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: apply theme class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
