import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { Video } from '../models/video';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Playlist } from "../models/playlist";
import { PlaylistEditPage } from '../playlist-edit/playlist-edit.page';
import { PlaylistsService } from '../services/playlists.service';
import { AlertController } from '@ionic/angular';
import { PlaylistVideosPage } from "../playlist-videos/playlist-videos.page";




@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
})

export class PlaylistsPage implements OnInit {
  private query = '';
  private myPlaylists: Playlist[] = [];

  constructor(
    private videos: VideosService,
    private playlists: PlaylistsService,
    public changes: ChangeDetectorRef,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.searchPlayList();
  }

  searchPlayList(evt?) {
    console.log('[MyPlaylistPage] searchPlayList()');
    this.playlists.findPlaylists()
      .then((playlists) => {
        this.myPlaylists = playlists;
        console.log('[MyPlaylistPage] searchPlayList() => ' + JSON.stringify(this.myPlaylists));
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
              this.abrirPlaylist(video);
            }
          },
          {
            text: "Play",
            icon: "play",
            handler: () => {
              this.playPlaylists(video);
            }
          },
          {
            text: "Editar",
            icon: "pencil-outline",
            handler: () => {
              this.showPlaylistsProperties(video);
            }
          },
          {
            text: "Eliminar",
            icon: "trash-outline",
            handler: () => {
              this.deleteplaylist(video);
            }
          }
        ]
      })
      .then(actionSheet => actionSheet.present());
  }

  addPlaylistV() {
    console.log(`[PlaylistsPage] addPlaylist()`);
    let playlist: Playlist = {
      title: "",
      description: "",
      thumbnail: null,
      date: Date.now(),
      count: 0
    };
    //Crear una pagina para Crear playlist y mostrarlo en un modal
    this.modalCtrl.create({
      component: PlaylistEditPage,
      componentProps: { mode: "add", playlist: playlist }
    })
      .then((modal) => {

        modal.onDidDismiss()
          .then((evt: OverlayEventDetail) => {
            if (evt && evt.data) {
              console.log(evt.data);
              this.playlists.addPlaylist(evt.data)
                .then(() => this.searchPlayList());
            }
          });
        modal.present();
      });

  }

  showPlaylistsProperties(playlist: Playlist) {
    console.log(`[PlaylistsPage] showPlaylistsProperties(${playlist.id})`);
    this.modalCtrl
      .create({
        component: PlaylistEditPage,
        componentProps: { mode: "edit", playlist: playlist }
      })
      .then(modal => {
        modal.onDidDismiss().then((evt: OverlayEventDetail) => {
          if (evt && evt.data) {
            this.playlists.updatePlaylist(evt.data)
              .then(() => this.searchPlayList());
          }
        });
        modal.present();
      });
  }

  deleteplaylist(playlist: Playlist) {
    console.log(`[PlaylistsPage] deleteplaylist(${playlist.id})`);
    this.alertCtrl
      .create({
        header: "Eliminar playList",
        message: "¿Estas seguro que quieres eliminarlo?",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "Aceptar",
            handler: () => {
              this.playlists
                .removePlaylist(playlist.id)
                .then(() => this.searchPlayList());
            }
          }
        ]
      })
      .then(alert => alert.present());
  }

  playPlaylists(playlist: Playlist) {
  }

  abrirPlaylist(playlist: Playlist) {
    this.modalCtrl
      .create({
        component: PlaylistVideosPage,
        componentProps: { playlist: playlist }
      })
      .then(modal => {
        modal.present();
      });
  }


}
