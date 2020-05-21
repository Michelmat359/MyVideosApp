import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { VideosService } from '../services/videos.service';
import { Video } from '../models/video';



@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
})

export class PlaylistsPage implements OnInit {
  private query = '';
  private myVideos: Video[] = [];
  constructor(private videos: VideosService,
    public changes: ChangeDetectorRef) { }

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



}
