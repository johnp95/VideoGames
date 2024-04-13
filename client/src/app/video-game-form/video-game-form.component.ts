import { JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GamesService } from '../services/games.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-game-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './video-game-form.component.html',
  styleUrl: './video-game-form.component.css',
})
export class VideoGameFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  gameformSubscription!: Subscription;
  paramsSubscription!: Subscription;
  gameService = inject(GamesService);

  isEdit = false;
  id = 0;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  ngOnDestroy(): void {
    if (this.gameformSubscription) {
      this.gameformSubscription.unsubscribe();
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.isEdit) {
      this.gameformSubscription = this.gameService
        .createGame(this.form.value)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.toasterService.success('Game Successfully Added');
            this.router.navigateByUrl('/games');
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.gameService.editGame(this.id, this.form.value).subscribe({
        next: (value) => {
          this.toasterService.success('Edited successfully');
          this.router.navigateByUrl('/games');
        },
        error: (err) => {
          this.toasterService.error('Unable to edit');
        },
      });
    }
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRouter.params.subscribe({
      next: (res) => {
        console.log(res['id']);
        let id = res['id'];
        this.id = id;
        if (!id) return;
        this.gameService.getGame(id).subscribe({
          next: (res) => {
            this.form.patchValue(res);
            this.isEdit = true;
          },
          error: (err) => console.log(err),
        });
      },
      error: (err) => console.log(err),
    });
    this.form = this.fb.group({
      title: ['', Validators.required],
      imgUrl: [],
      developer: ['', Validators.required],
      publisher: ['', Validators.required],
      platform: ['', Validators.required],
      releaseDate: ['', Validators.required],
    });
  }
}
