import { Routes } from '@angular/router';
import { VideoGamesComponent } from './video-games/video-games.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VideoGameDetailComponent } from './video-game-detail/video-game-detail.component';
import { ReleaseDateComponent } from './release-date/release-date.component';
import { VideoGameFormComponent } from './video-game-form/video-game-form.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: VideoGamesComponent },
  {
    path: 'games/form',
    title: 'New Game',
    component: VideoGameFormComponent,
  },
  {
    path: 'games/form/:id',
    title: 'New Game',
    component: VideoGameFormComponent,
  },
  { path: 'games', title: 'Games', component: VideoGamesComponent },
  { path: 'games/:id', title: 'Games', component: VideoGameDetailComponent },
  {
    path: 'release-date',
    title: 'Sort By Release',
    component: ReleaseDateComponent,
  },
  { path: '**', title: 'Page Not Found', component: PageNotFoundComponent },
];
