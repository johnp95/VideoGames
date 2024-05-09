import { Component, inject, Input, input, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { GameDetail } from '../interfaces/game-detail';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-games',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule, RouterLink],
  templateUrl: './video-games.component.html',
  styleUrl: './video-games.component.css',
})
export class VideoGamesComponent implements OnInit {
  private gameService = inject(GamesService);
  searchTerm: string = '';
  @Input() games: GameDetail[] = [];
  toasterService = inject(ToastrService);

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
  get filteredGames(): GameDetail[] {
    return this.games.filter((game) =>
      game.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
