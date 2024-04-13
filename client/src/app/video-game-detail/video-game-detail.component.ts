import { Component, inject, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GameDetail } from '../interfaces/game-detail';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-game-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './video-game-detail.component.html',
  styleUrl: './video-game-detail.component.css',
})
export class VideoGameDetailComponent implements OnInit {
  game!: GameDetail;
  toasterService = inject(ToastrService);
  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (res) => {
        console.log(res['id']);
        this.gameService.getGame(res['id']).subscribe({
          next: (res) => {
            this.game = res;
            console.log(res);
          },
          error: (err) => console.log(err),
        });
      },
      error: (err) => console.log(err),
    });
  }
  delete(id: number) {
    this.gameService.deleteGame(id).subscribe({
      next: (response) => {
        this.toasterService.success('Successfully Deleted');
        this.router.navigateByUrl('/games');
      },
    });
  }
}
