import { Component, OnInit, Input } from "@angular/core";
import { Playlist } from "../models/playlist";
import { ModalController } from "@ionic/angular";
import { AlertController } from '@ionic/angular';
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-playlist-edit",
  templateUrl: "./playlist-edit.page.html",
  styleUrls: ["./playlist-edit.page.scss"]
})
export class PlaylistEditPage implements OnInit {
  @Input()
  private mode = "view";

  @Input()
  private playlist: Playlist;
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
    //clone playlist
    this.playlist = this.clone(this.playlist);
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

  close() {
    console.log("[PlaylistEditPage] close()");
    this.modalCtrl.dismiss();
  }

  save() {
    console.log("[PlaylistEditPage] save()");
    console.log(this.playlist);
    this.modalCtrl.dismiss(this.playlist);
  }



  imagebutton() {
    //Avatar
    console.log("[VideoEditorPage] imagebutton()");
    this.camera.getPicture(this.optionsVideo).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.playlist.thumbnail.url = base64Image;
    }, (err) => {
      // Handle error
    }
    );

  }

  linkButton() {
    console.log("[VideoEditorPage] linkButton()");
    this.AlertCntrl.create({
      header: "Selecciona una imagen",
      message: "Introduce URL",
      inputs: [{ name: "url", placeholder: "URL" }],
      buttons: [
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
            console.log("Url: " + data.url);
            this.imagen(data.url);
          }
        }
      ]
    }).then((alert) => alert.present());
  }

  imagen(url: string) {
    console.log("[playlistEditPage] imagen()");
    if (this.playlist.thumbnail) {
      this.playlist.thumbnail.url = url;
    } else {
      this.playlist.thumbnail = {
        url: url,
        width: 64,
        height: 64
      }
    }
  }

  cameraButton() {
    console.log("[VideoEditorPage] cameraButton()");
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.playlist.thumbnail.url = base64Image;
    }, (err) => {
      // Handle error
    }
    );
  }
}
