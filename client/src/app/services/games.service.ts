import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameDetail } from '../interfaces/game-detail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  apiUrl = 'http://localhost:5127/api/Games';
  constructor(private http: HttpClient) {}

  getGames(): Observable<GameDetail> {
    return this.http.get<GameDetail>(this.apiUrl);
  }
  getGame(id: string): Observable<GameDetail> {
    return this.http.get<GameDetail>(this.apiUrl + '/' + id);
  }

  createGame(data: GameDetail): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
