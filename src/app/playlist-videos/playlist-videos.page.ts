import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Playlist } from "../models/playlist";
import { Video } from "../models/video";
import { ModalController } from "@ionic/angular";
import { PlaylistsService } from "../services/playlists.service";
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { VideoEditorPage } from '../video-editor/video-editor.page';
import { VideoPlayerPage } from '../video-player/video-player.page';
import { OverlayEventDetail } from '@ionic/core';
import { VideosService } from '../services/videos.service';




@Component({
  selector: 'app-playlist-videos',
  templateUrl: './playlist-videos.page.html',
  styleUrls: ['./playlist-videos.page.scss'],
})
export class PlaylistVideosPage implements OnInit {
  private playlist: Playlist;
  private myVideos: Video[] = [];

  constructor(private videos: VideosService,
    private playlists: PlaylistsService,
    private modalCtrl: ModalController,
    private changes: ChangeDetectorRef,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController) { }

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

  showMenu(video) {
    this.actionSheetCtrl.create({
      buttons: [
      {
        text: 'Play',
        icon: 'play',
        handler: () => {
          console.log('Play video!!');
          this.playVideo(video);
        }
      },
      {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          console.log('Edit video');
          console.log(video);
          this.editVideo(video);
        }
      },
      {
        text: 'Eliminar de la playlist',
        icon: 'trash',
        handler: () => {
          console.log('Delete video!!');
          this.deleteVideo(video);
        }
      }]
    }).then((actionSheet) => actionSheet.present());
  }

  editVideo(video: Video) {
    console.log(`[PlaylistPage] editVideo(${video.id})`);
    this.modalCtrl.create({
      component: VideoEditorPage,
      componentProps: { mode: 'edit', video: video }
    })
      .then((modal) => {
        modal.onDidDismiss()
          .then((evt: OverlayEventDetail) => {
            if (evt && evt.data) {
              this.videos.updateVideo(evt.data)
                .then(() => this.searchVideos());
            }
          });
        modal.present();
      });
  }

  playVideo(video: Video) {
    console.log(`[PlaylistPage] playVideo(${video.id})`);
    this.modalCtrl.create({
      component: VideoPlayerPage,
      componentProps: { video: video }
    }).then((modal) => modal.present());
  }


  deleteVideo(video: Video) {
    console.log(`[MyVideosPage] deleteVideo(${video.id})`);
    this.alertCtrl.create({
      header: 'Eliminar video de la playlist',
      message: '¿Estás seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Acceptar', handler: () => {
            this.playlists.removeVideo(this.playlist.id, video.id)
              .then(() => this.searchVideos());
            
          }
        }
      ]
    }).then((alert) => alert.present());
  }

}
