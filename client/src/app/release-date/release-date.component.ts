import { Component, inject, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { GameDetail } from '../interfaces/game-detail';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-release-date',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './release-date.component.html',
  styleUrl: './release-date.component.css',
})
export class ReleaseDateComponent implements OnInit {
  private gameService = inject(GamesService);

  games: GameDetail[] = [];

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getGames().subscribe({
      next: (res: any) => {
        this.games = res;
        this.games.sort(
          (a, b) =>
            new Date(a.releaseDate).getTime() -
            new Date(b.releaseDate).getTime()
        );
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
