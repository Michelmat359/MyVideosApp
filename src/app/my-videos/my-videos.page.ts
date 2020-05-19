import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video';
import { VideosService } from '../services/videos.service';
import { AlertController } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';



@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.page.html',
  styleUrls: ['./my-videos.page.scss'],
})


export class MyVideosPage implements OnInit {
  private query = '';
  private myVideos: Video[] = [];
  constructor(private videos: VideosService, private alertCtrl: AlertController, private camera: Camera, ) { }


  ngOnInit() {
    console.log('ngOnInit MyVideosPage');
    this.searchVideos();
  }

  searchVideos(evt?) {
    console.log('[MyVideosPage] searchVideos()');
    let query = evt ? evt.target.value.trim() : this.query;
    this.videos.findVideos(query)
      .then((videos) => this.myVideos = videos);
  }

  async enterVideo() {
    console.log('[MyVideosPage] enterVideo()');
    let prompt = await this.alertCtrl.create(
      {
        header: 'Select video',
        message: 'Enter video URL',
        inputs: [{ name: 'url', placeholder: 'URL' }],
        buttons: [{
          text: 'Cancel', role: 'cancel', handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: (data) => {
            console.log('URL ' + data.url + ' entered!!');
            this.addVideo(data.url);
          }
        }
        ]
      });
    await prompt.present();

  }

  selectVideo() {
    console.log('[MyVideosPage] selectVideo()');
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.VIDEO
    };
    this.camera.getPicture(options)
      .then((url) => {
        this.addVideo('file://' + url);
      })
      .catch((err) => {
        // Handle error
        this.alertCtrl.create({
          header: 'Error',
          message: 'ERROR selecting video: ' + JSON.stringify(err),
          buttons: ['OK']
        }).then((alert) => alert.present());
      });
  }


  addVideo(url: string) {
    console.log(`[MyVideosPage] addVideo()`);
    //TERMINAR
  }

}