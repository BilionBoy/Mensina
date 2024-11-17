import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/user/';

  constructor(private http: HttpClient) { }

  // Atualiza os dados do usuário com autenticação via Bearer Token
  atualizarDadosUsuario(dados: IUser, token: string): Observable<IUser> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<IUser>(`${this.apiUrl}`, dados, { headers });
  }
  

  // Obtém o ícone do usuário
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