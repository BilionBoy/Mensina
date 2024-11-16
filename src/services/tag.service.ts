import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITag } from '../interfaces/ITag'; // Corrigir o caminho

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiUrl = 'http://localhost:5000/tag';

  constructor(private http: HttpClient) { }

  getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(this.apiUrl);
  }
}
