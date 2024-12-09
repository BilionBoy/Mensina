import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(obj: any) {
    return this.http.post(`${environment.URL_API}/login`, obj)
  }

  get() {
    return this.http.get(`${environment.URL_API}/user/user_infos`)
  }
}
