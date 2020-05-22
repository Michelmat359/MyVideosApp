import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { YoutubeVideosService } from "../services/youtube-videos.service";
import { Video } from '../models/video';
import { VideosService } from '../services/videos.service';
import { AlertController } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { VideoEditorPage } from '../video-editor/video-editor.page';
import { OverlayEventDetail } from '@ionic/core';
import { ActionSheetController } from '@ionic/angular';
import { VideoPlayerPage } from '../video-player/video-player.page';



@Component({
  selector: 'app-youtube-videos',
  templateUrl: './youtube-videos.page.html',
  styleUrls: ['./youtube-videos.page.scss'],
})



export class YoutubeVideosPage implements OnInit {

  private query = '';
  private myVideos: Video[] = [];
  constructor(  public videos: YoutubeVideosService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public changes: ChangeDetectorRef) {
}

ngOnInit() {
  console.log("ngOnInit [YoutubeVideosPage] ");
  this.searchVideos();


}


searchVideos(evt ?) {
  console.log("[YoutubeVideosPage] searchVideos()");
  let query = evt ? evt.target.value.trim() : this.query;
  this.videos.findVideos(query).then(videos => {
    this.myVideos = videos;
    this.changes.detectChanges();
  });
}

showMenu(video) {
  this.actionSheetCtrl
    .create({
      buttons: [
        {
          text: "Añadir al playlist",
          icon: "star",
          handler: () => {
            // this.playVideo(video);
          }
        },
        {
          text: "Play",
          icon: "play",
          handler: () => {
            this.playVideo(video);
          }
        },
        {
          text: "Información",
          icon: "information-circle-outline",
          handler: () => {
            this.showVideoProperties(video);
          }
        }
      ]
    })
    .then(actionSheet => actionSheet.present());
}


playVideo(video: Video) {
  console.log(`[YoutubeVideosPage] playVideo(${video.id})`);
  this.modalCtrl
    .create({
      component: VideoPlayerPage,
      componentProps: { video: video }
    })
    .then(modal => modal.present());
}

showVideoProperties(video: Video) {
  console.log(`[YoutubeVideosPage] showVideoProperties(${video.id})`);
  this.modalCtrl
    .create({
      component: VideoEditorPage,
      componentProps: { mode: "view", video: video }
    })
    .then(modal => {
      modal.onDidDismiss().then((evt: OverlayEventDetail) => {
        if (evt && evt.data) {
          this.videos.updateVideo(evt.data).then(() => this.searchVideos());
        }
      });
      modal.present();
    });
}
}
