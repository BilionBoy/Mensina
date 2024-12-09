import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuizState } from '../interfaces/IQuizState';
import { IQuestion } from '../interfaces/IQuestion';
import { environment } from '../environments/environment';

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
      ? `${environment.URL_API}/quiz/`
      : `${environment.URL_API}/quiz/?tag_id=${params.tagId}`;

    url += !params?.tagId ? '?' : '&';
    url += `in_progress=${params?.inProgres === 'inProgres'}`;
    return this.http.get(url);
  }

  getQuizById(quizId: number): Observable<IQuizState> {
    return this.http.get<IQuizState>(
      `${environment.URL_API}/quiz/start/${quizId}`
    );
  }

  getQuestions(quizId: number): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(
      `${environment.URL_API}/quiz/questions/${quizId}`
    );
  }

  checkAnswer(
    questionId: number,
    answerId: number
  ): Observable<{ is_correct: boolean }> {
    return this.http.get<{ is_correct: boolean }>(
      `${environment.URL_API}/quiz/answer_check?answer_id=${answerId}&question_id=${questionId}`
    );
  }

  finishQuiz(quizId: number): Observable<IQuizState> {
    return this.http.delete<IQuizState>(
      `${environment.URL_API}/quiz/finish/${quizId}`
    );
  }
}
