import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKpi } from '../interfaces/IKpi';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/user/';

  userInfo?: IUser

  constructor(private http: HttpClient) {}

  // Atualiza os dados do usuário com autenticação via Bearer Token
  atualizarDadosUsuario(dados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, dados);
  }

  // Faz o upload de um ícone de usuário
  uploadIcon(icon: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}icon`, icon, { observe: 'response' });
  }

  private _getUserInfos() {
    return new Promise<void>((resolve, rej) => {
      this.http.get<IUser>(`${this.apiUrl}user_infos`)
      .subscribe({
        next: res => {
          this.userInfo = res
          resolve()
        },
        error: err => {
          rej()
        }
      })
    })
  }

  async getUserInfos(reload?: boolean): Promise<IUser> {
    if(this.userInfo && !reload) {      
      return this.userInfo
    }
    await this._getUserInfos()

    return this.userInfo!
  }

  getKpi(): Observable<IKpi> {
    return this.http.get<IKpi>(`${this.apiUrl}kpi`);
  }
}
