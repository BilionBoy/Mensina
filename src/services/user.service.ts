import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/user/';

  constructor(private http: HttpClient) { }

  // Atualiza os dados do usuário com autenticação via Bearer Token
  atualizarDadosUsuario(dados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, dados);
  }

  // Obtém o ícone do usuário
  getIcon(userId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}icon/${userId}`, {
      responseType: 'blob'
    });
  }

  // Faz o upload de um ícone de usuário
  uploadIcon(icon: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}icon`, icon, { observe: "response" });
  }

  // Obtém informações do usuário
  getUserInfos(): Observable<any> {
    return this.http.get(`${this.apiUrl}user_infos`);
  }
}
