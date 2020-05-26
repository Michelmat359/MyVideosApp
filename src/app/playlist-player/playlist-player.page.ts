import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { DomSanitizer } from '@angular/platform-browser';
import { PlaylistsService } from "../services/playlists.service";
import { Playlist } from "../models/playlist";
import { Video } from "../models/video";

@Component({
  selector: 'app-playlist-player',
  templateUrl: './playlist-player.page.html',
  styleUrls: ['./playlist-player.page.scss'],
})

export class PlaylistPlayerPage implements OnInit {
  private playlist: Playlist;
  private video: Video;
  private myVideos: Video[] = [];

  constructor(
    private modalCtrl: ModalController,
    private domSanitizer: DomSanitizer,
    private playlists: PlaylistsService,
    private changes: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.start();
  }


  start(){
    this.playlists.listVideos(this.playlist.id).then(videos => {
     let aux = 0;
     this.myVideos = videos;
     this.video = videos[aux];
    this.changes.detectChanges();
    });
  }

  //Podriamos añadir una funcion para pasar video. 

  close() {
    console.log("[PlaylistPlayerPage] close()");
    this.modalCtrl.dismiss();
  }
}
