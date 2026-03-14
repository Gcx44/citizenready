import QuizContainer from "@/components/QuizContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}/quiz`,
      languages: {
        "en-CA": "/en/quiz",
        "fr-CA": "/fr/quiz",
        "x-default": "/en/quiz",
      },
    },
  };
}

interface QuizPageProps {
  searchParams: Promise<{ n?: string; practice?: string }>;
}

export default async function QuizPage({ searchParams }: QuizPageProps) {
  const params = await searchParams;
  const quizSize = Math.min(385, Math.max(20, parseInt(params.n ?? "20")));
  const isPractice = params.practice === "true";

  return <QuizContainer quizSize={quizSize} isPractice={isPractice} />;
}
