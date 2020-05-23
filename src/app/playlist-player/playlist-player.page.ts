import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-playlist-player',
  templateUrl: './playlist-player.page.html',
  styleUrls: ['./playlist-player.page.scss'],
})
export class PlaylistPlayerPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  close() {
    console.log("[PlaylistPlayerPage] close()");
    this.modalCtrl.dismiss();
  }
}
