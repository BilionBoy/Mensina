import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRank } from '../interfaces/IRank';
import { environment } from '../environments/environment';

interface IParams {
  update_rank?: boolean
  page?: number
  perPage?: number
}

@Injectable({
  providedIn: 'root'
})
export class RankService {

  private baseUrl = `${environment.URL_API}/rank/`;

  constructor(private http: HttpClient) { }

  getRank(_params?: IParams): Observable<IRank[]> {
    const params: any = {}
    if(_params?.page) params.page = String(_params?.page)
    if(_params?.perPage) params.perPage = String(_params?.perPage)
    if(_params?.update_rank) params.page = String(_params?.update_rank)
    return this.http.get<IRank[]>(this.baseUrl, { params });
  }
}
