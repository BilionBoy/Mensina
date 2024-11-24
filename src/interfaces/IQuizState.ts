export interface IQuizState {
  correct: number;
  questions: Record<number, number>;
  quizzId: number;
  score: number;
  total: number;
  userId: number;
  quizTitle: string;
}
