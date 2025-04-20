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

  // CHANGED: Modified onSubmit to format the date properly before submission
  // CHANGED: Added debugging for imgUrl issue
  onSubmit() {
    // Create a copy of form values to manipulate
    const formData = { ...this.form.value };

    // Log entire form data before submission
    console.log('Form data before submission:', formData);

    // Format the date properly if it exists
    if (formData.releaseDate) {
      // Convert to yyyy-MM-dd format
      const date = new Date(formData.releaseDate);
      formData.releaseDate = date.toISOString().split('T')[0];
    }

    console.log('Form data after date formatting:', formData);

    if (!this.isEdit) {
      this.gameformSubscription = this.gameService
        .createGame(formData)
        .subscribe({
          next: (response) => {
            console.log('Create response:', response);
            this.toasterService.success('Game Successfully Added');
            this.router.navigateByUrl('/games');
          },
          error: (err) => {
            console.log('Create error:', err);
          },
        });
    } else {
      console.log('Sending edit request with data:', formData);
      this.gameService.editGame(this.id, formData).subscribe({
        next: (value) => {
          console.log('Edit response:', value);
          this.toasterService.success('Edited successfully');
          this.router.navigateByUrl('/games');
        },
        error: (err) => {
          console.log('Edit error:', err);
          this.toasterService.error('Unable to edit');
        },
      });
    }
  }

  // CHANGED: Modified ngOnInit to properly format the date when loading existing data
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRouter.params.subscribe({
      next: (res) => {
        console.log(res['id']);
        let id = res['id'];
        this.id = id;
        if (!id) return;
        this.gameService.getGame(id).subscribe({
          next: (res) => {
            // Format incoming date if needed
            if (res.releaseDate) {
              const date = new Date(res.releaseDate);
              res.releaseDate = date.toISOString().split('T')[0];
            }
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
      imgUrl: [''],
      developer: ['', Validators.required],
      publisher: ['', Validators.required],
      platform: ['', Validators.required],
      releaseDate: ['', Validators.required],
    });
  }
}
