import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistEditPageRoutingModule } from './playlist-edit-routing.module';

import { PlaylistEditPage } from './playlist-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistEditPageRoutingModule
  ],
  declarations: [PlaylistEditPage]
})
export class PlaylistEditPageModule {}
