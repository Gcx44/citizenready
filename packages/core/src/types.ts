export interface QuestionLocale {
  question: string;
  choices: string[];
  answer: number;
}

export interface QuestionSource {
  page_en: number;
  page_fr: number;
  section_en: string;
  section_fr: string;
}

export interface Question {
  id: number;
  category: string;
  en: QuestionLocale;
  fr: QuestionLocale;
  source: QuestionSource;
}

export interface QuizStats {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  bestScore: number;
}

export interface StorageAdapter {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem?(key: string): void | Promise<void>;
}
