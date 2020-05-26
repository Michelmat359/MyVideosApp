import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Playlist } from "../models/playlist";
import { Video } from "../models/video";
import { ModalController } from "@ionic/angular";
import { PlaylistsService } from "../services/playlists.service";

@Component({
  selector: 'app-playlist-videos',
  templateUrl: './playlist-videos.page.html',
  styleUrls: ['./playlist-videos.page.scss'],
})
export class PlaylistVideosPage implements OnInit {
  private playlist: Playlist;
  private myVideos: Video[] = [];

  constructor(
    private playlists: PlaylistsService,
    private modalCtrl: ModalController,
    private changes: ChangeDetectorRef) { }

  ngOnInit() {
    this.playlist = this.clone(this.playlist);
    this.searchVideos();

  }


  close() {
    console.log("[PlaylistVideosPage] close()");
    this.modalCtrl.dismiss();
  }


  searchVideos(evt?) {
    console.log('[MyVideosPage] searchVideos()');
    this.playlists.listVideos(this.playlist.id)
      .then((playlists) => {
        this.myVideos = playlists;
        console.log('[MyPlaylistPage] searchPlayList() => '+ JSON.stringify(this.myVideos));
        this.changes.detectChanges();
      });
  }

  private clone(playlist: Playlist): Playlist {
    return {
      id: playlist.id,
      title: playlist.title,
      description: playlist.description,
      thumbnail: playlist.thumbnail,
      date: playlist.date,
      count: playlist.count
    };
  }


}
