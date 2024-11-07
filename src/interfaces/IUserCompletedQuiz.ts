import { IQuiz } from "./IQuiz";
import { IUser } from "./IUser";

export interface IUserCompletedQuiz {
  id: number,
  score: number,
  userId: number,
  user: IUser,
  quizId: number,
  quiz: IQuiz
}
