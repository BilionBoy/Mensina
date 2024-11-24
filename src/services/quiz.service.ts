import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuizState } from '../interfaces/IQuizState';
import { IQuestion } from '../interfaces/IQuestion';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuizzes(params?: {
    tagId?: number;
    inProgres?: 'inProgres' | 'notInProgres';
  }): Observable<any> {
    let url = !params?.tagId
      ? 'http://localhost:5000/quiz/'
      : `http://localhost:5000/quiz/?tag_id=${params.tagId}`;

    url += !params?.tagId ? '?' : '&';
    url += `in_progress=${params?.inProgres === 'inProgres'}`;
    return this.http.get(url);
  }

  getQuizById(quizId: number): Observable<IQuizState> {
    return this.http.get<IQuizState>(
      `http://localhost:5000/quiz/start/${quizId}`
    );
  }

  getQuestions(quizId: number): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(
      `http://localhost:5000/quiz/questions/${quizId}`
    );
  }

  checkAnswer(
    questionId: number,
    answerId: number
  ): Observable<{ is_correct: boolean }> {
    return this.http.get<{ is_correct: boolean }>(
      `http://localhost:5000/quiz/answer_check?answer_id=${answerId}&question_id=${questionId}`
    );
  }

  finishQuiz(quizId: number): Observable<IQuizState> {
    return this.http.delete<IQuizState>(
      `http://localhost:5000/quiz/finish/${quizId}`
    );
  }
}
