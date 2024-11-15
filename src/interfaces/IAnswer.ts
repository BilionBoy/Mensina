import { IQuestion } from "./IQuestion";

export interface IAnswer {
  id: number,
  description: string,
  isCorrect: boolean,
  questionId: number,
  question?: IQuestion
}
