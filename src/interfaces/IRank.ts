import { IQuiz } from './IQuiz';
import { IUser } from './IUser';

export interface IRank {
  id: number;
  totalScore: number;
  userId: number;
  user: IUser;
  bestScoreQuizId: number;
  bestScoreQuiz: IQuiz;
}
