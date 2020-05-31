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
  private posicion: number;

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
     this.posicion = 0;
     this.myVideos = videos;
     this.video = videos[this.posicion];
    this.changes.detectChanges();
    });
  }

  async playNext() {
    console.log("[PlaylistPlayerPage] playNext()");
    if(this.posicion++ < this.myVideos.length-1){
      this.video = this.myVideos[this.posicion];
    }else{
      console.log("Vamois al primer video");
      this.posicion = 0;
      console.log(this.myVideos[this.posicion])
      this.video = this.myVideos[this.posicion];
    }

  }

  async playPrevious() {
    console.log("[PlaylistPlayerPage] playPrevious()");
    if(this.posicion-- > 0){
      this.video = this.myVideos[this.posicion];
    }else{
      console.log("Vamos al ultimo video");
      this.posicion = this.myVideos.length-1;
      console.log(this.myVideos[this.posicion])
      this.video = this.myVideos[this.posicion];
    }

  }

  async playRandom() {
    console.log("[PlaylistPlayerPage] playRandom()");
    var alatorio = Math.floor((Math.random()*this.myVideos.length))-1;
    console.log("VIDEO " + alatorio);
    this.video = this.myVideos[alatorio];

  }


  close() {
    console.log("[PlaylistPlayerPage] close()");
    this.modalCtrl.dismiss();
  }
}
