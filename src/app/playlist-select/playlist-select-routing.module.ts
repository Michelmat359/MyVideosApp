import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistSelectPage } from './playlist-select.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistSelectPageRoutingModule {}
