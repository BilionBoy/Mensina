import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRank } from '../interfaces/IRank';

@Injectable({
  providedIn: 'root'
})
export class RankService {

  private baseUrl = `http://localhost:5000/rank`;

  constructor(private http: HttpClient) { }

  getRank(updateRank: boolean = false): Observable<IRank[]> {
    const params = { update_rank: updateRank.toString() };
    return this.http.get<IRank[]>(this.baseUrl, { params });
  }
}
