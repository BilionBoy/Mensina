import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKpi } from '../interfaces/IKpi';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/user/';

  constructor(private http: HttpClient) {}

  // Atualiza os dados do usuário com autenticação via Bearer Token
  atualizarDadosUsuario(dados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, dados);
  }

  // Faz o upload de um ícone de usuário
  uploadIcon(icon: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}icon`, icon, { observe: 'response' });
  }

  // Obtém informações do usuário
  getUserInfos(): Observable<any> {
    return this.http.get(`${this.apiUrl}user_infos`);
  }

  getKpi(): Observable<IKpi> {
    return this.http.get<IKpi>(`${this.apiUrl}kpi`);
  }
}
