import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
import { Video } from '../models/video';
import { PlaylistsService } from "../services/playlists.service";
import { Playlist } from "../models/playlist";
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-playlist-select',
  templateUrl: './playlist-select.page.html',
  styleUrls: ['./playlist-select.page.scss'],
})
export class PlaylistSelectPage implements OnInit {
  private myPlaylists: Playlist[];
  private video: Video;


  constructor(
    private modalCtrl: ModalController,
    private playlists: PlaylistsService,
    private alertCtrl: AlertController,
    public changes: ChangeDetectorRef ) { }

  ngOnInit() {
    this.searchPlayList();
  }

  searchPlayList(evt?) {
    console.log('[MyPlaylistSelectPage] searchPlayList()');
    this.playlists.findPlaylists()
      .then((playlists) => {
        this.myPlaylists = playlists;
        console.log('[MyPlaylistPage] searchPlayList() => ' + JSON.stringify(this.myPlaylists));
        this.changes.detectChanges();
      }).then(_=> {
        this.close();
      })
  }

  close() {
    console.log("[PlaylistsSelectPage] close()");
    this.modalCtrl.dismiss();
  }

  addToPlaylist(playlist: Playlist) {
    console.log(`[PlaylistsSelectorPage] addToPlaylist(${playlist.id})`);
    this.playlists
      .addVideo(playlist.id, this.video)
      .then(_ => {
        this.changes.detectChanges();
      })
      .catch(err => {
        // Handle error
        this.alertCtrl.create({
          header: 'Error',
          message: 'ERROR selecting video: ' + JSON.stringify(err),
          buttons: ['OK']
        }).then((alert) => alert.present());
      });

  }


}
