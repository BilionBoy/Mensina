import { IAnswer } from "./IAnswer";
import { IQuiz } from "./IQuiz";

export interface IQuestion {
  id: number,
  title:string,
  description: string,
  quizId: number,
  quiz?: IQuiz,
  answers?: IAnswer[]
}
