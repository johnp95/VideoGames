import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-video-game-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './video-game-form.component.html',
  styleUrl: './video-game-form.component.css',
})
export class VideoGameFormComponent implements OnInit {
  form!: FormGroup;
  gameService = inject(GamesService);
  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log('Form data:', this.form.value); // Log the form data
    this.gameService.createGame(this.form.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [],
      imgUrl: [],
      developer: [],
      publisher: [],
      platform: [],
      releaseDate: [],
    });
  }
}
