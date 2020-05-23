import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-playlist-player',
  templateUrl: './playlist-player.page.html',
  styleUrls: ['./playlist-player.page.scss'],
})
export class PlaylistPlayerPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  close() {
    console.log("[PlaylistPlayerPage] close()");
    this.modalCtrl.dismiss();
  }
}
