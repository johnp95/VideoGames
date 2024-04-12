import { Component, inject, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameDetail } from '../interfaces/game-detail';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-game-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './video-game-detail.component.html',
  styleUrl: './video-game-detail.component.css',
})
export class VideoGameDetailComponent implements OnInit {
  game!: GameDetail;

  constructor(
    private route: ActivatedRoute,
    private gameDetailService: GamesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gameDetailService.getGame(id).subscribe((game) => {
        this.game = game;
      });
    }
  }
}
