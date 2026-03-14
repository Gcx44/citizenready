// Re-export from @leafready/core for backwards compatibility within the web app.
// Async versions require passing localStorageAdapter.
export type { Question } from "@leafready/core";
export { selectQuestions, calculateScore } from "@leafready/core";
