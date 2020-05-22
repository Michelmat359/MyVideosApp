import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { Video } from '../models/video';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular'; 
import { OverlayEventDetail } from '@ionic/core';
import { Playlist } from "../models/playlist";
import { PlaylistEditPage} from '../playlist-edit/playlist-edit.page';
import { PlaylistsService } from '../services/playlists.service'



@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
})

export class PlaylistsPage implements OnInit {
  private query = '';
  private myVideos: Video[] = [];
  private myPlaylists: Playlist[];

  constructor(private videos: VideosService,
    private playlists: PlaylistsService,
    public changes: ChangeDetectorRef,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  searchVideos(evt?) {
    console.log('[MyPlaylistPage] searchVideos()');
    let query = evt ? evt.target.value.trim() : this.query;
    this.videos.findVideos(query)
      .then((videos) => {
        this.myVideos = videos
        console.log('[MyPlaylistPage] searchVideos() => ' +
          JSON.stringify(this.myVideos));
        this.changes.detectChanges();
      });
  }

  showMenu(video) {
    this.actionSheetCtrl
      .create({
        buttons: [
          {
            text: "Abrir",
            icon: "folder-open-outline",
            handler: () => {
              // this.playVideo(video);
            }
          },
          {
            text: "Play",
            icon: "play",
            handler: () => {
              // this.playVideo(video);
            }
          },
          {
            text: "Editar",
            icon: "pencil-outline",
            handler: () => {
              // this.showVideoProperties(video);
            }
          },
          {
            text: "Eliminar",
            icon: "trash-outline",
            handler: () => {
              // this.showVideoProperties(video);
            }
          }
        ]
      })
      .then(actionSheet => actionSheet.present());
  }

  addPlaylist() {
    console.log(`[PlaylistsPage] addPlaylist()`);
    let playlist: Playlist = {
      title: "",
      description: "",
      thumbnail: null,
      date: Date.now(),
      count: 0
    };
    //Crear una pagina para Crear playlist y mostrarlo en un modal
    this.modalCtrl
      .create({
        component: PlaylistEditPage,
        componentProps: { mode: "add", playlist: playlist }
      })
      .then(modal => {
        modal.onDidDismiss().then((evt: OverlayEventDetail) => {
          if (evt && evt.data) {
                this.playlists.addPlaylist(evt.data);
              }
          });
        modal.present();
        });
  }
}
