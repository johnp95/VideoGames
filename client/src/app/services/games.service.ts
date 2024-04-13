import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameDetail } from '../interfaces/game-detail';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  apiUrl = environment.URL;
  constructor(private http: HttpClient) {}

  getGames(): Observable<GameDetail> {
    return this.http.get<GameDetail>(this.apiUrl);
  }
  getGame(id: number): Observable<GameDetail> {
    return this.http.get<GameDetail>(`${this.apiUrl}/${id}`);
  }

  createGame(data: GameDetail): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  deleteGame(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  editGame(id: number, data: GameDetail) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
