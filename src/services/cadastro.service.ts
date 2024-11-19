import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  signup(obj: any): Observable<any>  {
    return this.http.post('http://localhost:5000/user/', obj)
  }
}