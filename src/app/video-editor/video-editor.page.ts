import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../models/video';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";




@Component({
  selector: 'app-video-editor',
  templateUrl: './video-editor.page.html',
  styleUrls: ['./video-editor.page.scss'],
})

export class VideoEditorPage implements OnInit {

  @Input()
  private mode = 'view';

  @Input()
  private video: Video;
  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  public optionsVideo: CameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    mediaType: this.camera.MediaType.VIDEO
  };

  constructor(private modalCtrl: ModalController,
   private AlertCntrl: AlertController,
   private camera: Camera
   ) { 
     
   }

  ngOnInit() { 
    this.video = this.clone(this.video);

  }

  close() {
    console.log('[VideoEditorPage] close()');
    this.modalCtrl.dismiss();
  }

  save() {
    console.log('[VideoEditorPage] save()');
    this.modalCtrl.dismiss(this.video);
  }

  private clone(video: Video): Video {
    return {
      id: video.id,
      type: video.type,
      url: video.url,
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      tags: video.tags,
      duration: video.duration,
      date: video.date,
      width: video.width,
      height: video.height
    };
  }

  imageButton(){
    //Avatar
    console.log("[VideoEditorPage] imagebutton()");
    this.camera.getPicture(this.optionsVideo).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.video.thumbnail.url = base64Image;
    }, (err) => {
      // Handle error
    }
    );

  }

  linkButton(){
    console.log("[VideoEditorPage] linkButton()");
    this.AlertCntrl.create({
      header: "Selecciona una imagen",
      message: "Introduce URL",
      inputs:[{ name:"url", placeholder: "URL"}],
      buttons:[
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("clicked");
          }
        },
        {
          text: "Aceptar",
          handler: data => {
            console.log("Url: " + data.url );
            this.imagen(data.url);
          }
        }
      ]
    }).then((alert) => alert.present());
  }

  imagen(url: string){
    console.log("[VideoEditorPage] imagen()");
    if (this.video.thumbnail) {
      this.video.thumbnail.url = url;
    } else {
      this.video.thumbnail = {
        url: url,
        width: 64,
        height: 64
      }
    }
  }

  cameraButton(){
    console.log("[VideoEditorPage] cameraButton()");
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.video.thumbnail.url = base64Image;
    }, (err) => {
      // Handle error
    }
    );
  }
}