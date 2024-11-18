import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuizzes(params?: { tagId?: number, inProgres?: 'inProgres' | 'notInProgres' }): Observable<any> {
    console.log(params);

    let url = !params?.tagId ?
      'http://localhost:5000/quiz/' :
      `http://localhost:5000/quiz/?tag_id=${params.tagId}`

    url += !params?.tagId ? '?' : '&'
    url += `in_progress=${params?.inProgres === 'inProgres'}`
    return this.http.get(url)
  }
}
