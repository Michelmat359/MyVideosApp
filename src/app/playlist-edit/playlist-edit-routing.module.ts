import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistEditPage } from './playlist-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistEditPageRoutingModule {}
