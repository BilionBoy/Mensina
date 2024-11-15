import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getIcon(userId: number) {
    return this.http.get(`http://localhost:5000/user/icon/${userId}`, {
      responseType: 'blob'
    })
  }

  uploadIcon(icon: FormData) {
    return this.http.post('http://localhost:5000/user/icon', icon, {observe: "response"})
  }

  getUserInfos(){
    return this.http.get('http://localhost:5000/user/user_infos')
  }
}
