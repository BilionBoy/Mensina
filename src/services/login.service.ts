import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(obj: any) {
    return this.http.post('http://localhost:5000/login', obj)
  }

  get() {
    return this.http.get('http://localhost:5000/user/user_infos')
  }
}
