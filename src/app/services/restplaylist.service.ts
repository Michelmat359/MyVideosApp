import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Video } from '../models/video';
import {Playlist} from '../models/playlist';
import { RESTVideosService } from './restvideos.service';


@Injectable({
  providedIn: 'root'
})
export class RESTPlaylistsService {

  private rootUrl = 'http://localhost:8080/myvideos';
  private Playlist: Playlist[] = [];
  private videos: Video[] = [];
  private nextId = 0;
  private PlaylistVideos = [];
  constructor(private login: UserService, private http: HttpClient, private Videos: RESTVideosService) { }


 findPlaylists(query?:string):Promise<Playlist[]> {
 console.log(`[RESTPlayListVideosService] findPlaylsits`);
 let user = this.login.getUser();
 return new Promise((resolve, reject) => {
   let url = this.rootUrl + `/users/${user.id}/playlists`;
   let params: any = { token: this.login.getToken() };
   this.http.get(url, { params: params })
     .subscribe(
       (playlist: Playlist[]) => { resolve(playlist); },
       (err) => { reject(err); }
     );
 });
}


  addPlaylist(playlist: Playlist): Promise<Playlist> {
    console.log('[RESTPlayListsService] addPlaylist(' + JSON.stringify(playlist) + ')');
    let user = this.login.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists`;
      let params: any = { token: this.login.getToken() };
      this.http.post(url, playlist, { params: { token: this.login.getToken() } })
        .subscribe(
          (plaslist: Playlist) => { resolve(playlist); },
          (err) => { reject(err); }
        );
    });
  }

  updatePlaylist(playlist: Playlist): Promise<Video> {
    console.log('[RESTPlayListsService] updatePlaylist()');
    let user = this.login.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists/${playlist.id}`;
      this.http.put(url, playlist, { params: { token: this.login.getToken() } })
        .subscribe(
          (video: Video) => { resolve(video); },
          (err) => { reject(err); }
        );
    });
  }

  removePlaylist(id: string): Promise<void> {
    console.log('[RESTPlayListsService] removePlaylist()');
    let user = this.login.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists/${id}`;
      this.http.delete(url, { params: { token: this.login.getToken() } })
        .subscribe(
          () => { resolve(); },
          (err) => { reject(err); }
        );
    });
  }


  listVideos(playlistId: string): Promise<Video[]> {
    console.log('[RESTPlayListsService] listVideosPlaylist()');
    let user = this.login.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists/${playlistId}/videos`;
      let params: any = { token: this.login.getToken() };
      this.http.get(url, { params: params })
        .subscribe(
          (videos: Video[]) => { resolve(videos); },
          (err) => { reject(err); }
        );
    });
  }

  removeVideo(playlistId: string, videoId: string): Promise<void>{
    console.log('[RESTPlayListsService] removevideo()');
    let user = this.login.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists/${playlistId}/videos/${videoId}`;
      this.http.delete(url, { params: { token: this.login.getToken() } })
        .subscribe(
          () => { resolve(); },
          (err) => { reject(err); }
        );
    });
  }

  addVideo(playlistId: string, video: Video): Promise<void> {
    console.log('[RESTPlayListsService] addvideo()');
    let user = this.login.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists/${playlistId}/videos`;
      let params: any = { token: this.login.getToken() };
      this.http.post(url, video, { params: { token: this.login.getToken() } })
        .subscribe(
          () => { resolve(); },
          (err) => { reject(err); }
        );
    });
  }

}
