import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<any> {
    const token = localStorage.getItem('token')
    if(!token ) throw new Error()
    return this.http.get('http://localhost:5000/quiz/', {headers: {'Authorization': `Bearer ${token}`}})
  }
}
