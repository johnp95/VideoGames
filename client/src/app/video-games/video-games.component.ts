import { Component, inject, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { GameDetail } from '../interfaces/game-detail';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-video-games',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './video-games.component.html',
  styleUrl: './video-games.component.css',
})
export class VideoGamesComponent implements OnInit {
  private gameService = inject(GamesService);

  games: GameDetail[] = [];

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getGames().subscribe({
      next: (res: any) => {
        this.games = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
