import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITag } from 'src/app/interfaces/ITag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiUrl = 'http://localhost:5000/tag';  // URL da API de tags

  constructor(private http: HttpClient) { }

  getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(this.apiUrl);  // Requisição GET para obter as tags
  }
}
