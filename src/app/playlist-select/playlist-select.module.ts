import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistSelectPageRoutingModule } from './playlist-select-routing.module';

import { PlaylistSelectPage } from './playlist-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistSelectPageRoutingModule
  ],
  declarations: [PlaylistSelectPage]
})
export class PlaylistSelectPageModule {}
