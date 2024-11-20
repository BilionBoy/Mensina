import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRank } from 'src/interfaces/IRank';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  private readonly API_URL = 'http://localhost:5000/rank';

  constructor(private http: HttpClient) {}

  getRank(updateRank: boolean = false): Observable<IRank[]> {
    return this.http.get<IRank[]>(`${this.API_URL}?update_rank=${updateRank}`);
  }
}
