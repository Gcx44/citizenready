import { useLocalSearchParams } from "expo-router";
import QuizScreen from "../src/components/QuizScreen";

export default function Quiz() {
  const { size, practice } = useLocalSearchParams<{
    size?: string;
    practice?: string;
  }>();

  const n = parseInt(size ?? "", 10);
  const quizSize = !isNaN(n) && n > 0 ? n : 20;

  return <QuizScreen quizSize={quizSize} isPractice={practice === "true"} />;
}
