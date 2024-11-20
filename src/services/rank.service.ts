import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRank } from 'src/interfaces/IRank';

@Injectable({
  providedIn: 'root'
})
export class RankService {

  private baseUrl = `${environment.apiUrl}/rank`;

  constructor(private http: HttpClient) {}

  getRank(updateRank: boolean = false): Observable<IRank[]> {
    const params = { update_rank: updateRank.toString() };
    return this.http.get<IRank[]>(this.baseUrl, { params });
  }
}
