import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITag } from '../interfaces/ITag'; // Corrigir o caminho
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiUrl = `${environment.URL_API}/tag/`;

  constructor(private http: HttpClient) { }

  getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(this.apiUrl);
  }
}
