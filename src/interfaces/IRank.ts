import { IQuiz } from "./IQuiz";
import { IUser } from "./IUser";

export interface IRank {
    id: number;
    totalScore: number;
    user: IUser;
    bestScoreQuiz: IQuiz;
  }
  