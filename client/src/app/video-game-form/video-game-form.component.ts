import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-game-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './video-game-form.component.html',
  styleUrl: './video-game-form.component.css',
})
export class VideoGameFormComponent {}
