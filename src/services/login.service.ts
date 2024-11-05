import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private http: HttpClient) { }

login(obj: any) {
  return this.http.post('http://localhost:5000/login', obj)
}

signup(obj: any) {
  return this.http.post('http://localhost:5000/user/', obj)
}
}
