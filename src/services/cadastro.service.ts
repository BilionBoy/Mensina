import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  signup(obj: any) {
    return this.http.post('http://localhost:5000/user/', obj)
  }
}