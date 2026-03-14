import { useLocalSearchParams } from "expo-router";
import QuizScreen from "../src/components/QuizScreen";

export default function Quiz() {
  const { size, practice } = useLocalSearchParams<{
    size?: string;
    practice?: string;
  }>();

  return (
    <QuizScreen
      quizSize={size ? parseInt(size, 10) : 20}
      isPractice={practice === "true"}
    />
  );
}
