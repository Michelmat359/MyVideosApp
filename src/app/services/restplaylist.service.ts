import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Video } from '../models/video';
import {Playlist} from '../models/playlist';
import { PlaylistsService } from './playlists.service';
import { YoutubeVideosService } from "./youtube-videos.service";


@Injectable({
  providedIn: 'root'
})
export class RESTPlaylistsService extends PlaylistsService{

  private rootUrl = 'http://localhost:8080/myvideos';
  private token: string;
  private userId: string;
  constructor(
    private users: UserService,
    private youtube: YoutubeVideosService,
    private http: HttpClient
  ) {
    super();
    this.token = users.getSessionToken();
    this.userId = users.getSessionUser().id;
  }

  findPlaylists(): Promise<Playlist[]> {
    console.log(`[RESTPlaylistsService] findPlaylists()`);
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.rootUrl}/users/${this.userId}/playlists`, {
          params: { token: this.token, q: "" }
        })
        .subscribe(
          (playlists: [Playlist]) => {
            resolve(playlists);
          },
          err => {
            console.log(
              `[RESTPlaylistsService] findPlaylists() ERROR: ` +
                JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  addPlaylist(playlist: Playlist): Promise<Playlist> {
    console.log(`[RESTPlaylistsService] addPlaylist(${playlist.title})`);
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.rootUrl}/users/${this.userId}/playlists`, playlist, {
          params: { token: this.token }
        })
        .subscribe(
          (playlist: Playlist) => {
            resolve(playlist);
          },
          err => {
            console.log(
              `[RESTPlaylistsService] addPlaylist(${playlist.title}) ERROR: ` +
                JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  removePlaylist(playlistId: string): Promise<void> {
    console.log(`[RESTPlaylistsService] removePlaylist(${playlistId})`);
    return new Promise((resolve, reject) => {
      this.http
        .delete(
          `${this.rootUrl}/users/${this.userId}/playlists/${playlistId}`,
          {
            params: { token: this.token }
          }
        )
        .subscribe(
          (data: any) => {
            resolve();
          },
          err => {
            console.log(
              `[RESTPlaylistsService] removePlaylist(${playlistId}) ERROR: ` +
                JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  updatePlaylist(playlist: Playlist): Promise<Playlist> {
    console.log(`[RESTPlaylistsService] removePlaylist(${playlist.id})`);
    return new Promise((resolve, reject) => {
      this.http
        .put(
          `${this.rootUrl}/users/${this.userId}/playlists/${playlist.id}`,
          playlist,
          {
            params: { token: this.token }
          }
        )
        .subscribe(
          (playlist: Playlist) => {
            resolve(playlist);
          },
          err => {
            console.log(
              `[RESTPlaylistsService] removePlaylist(${playlist.id}) ERROR: ` +
                JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  addVideo(playlistId: string, video: Video): Promise<void> {
    console.log(
      `[RESTPlaylistsService] addVideo(${playlistId}, video: ${video.id})`
    );
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.rootUrl}/users/${this.userId}/playlists/${playlistId}/videos`,
          video,
          {
            params: { token: this.token }
          }
        )
        .subscribe(
          () => {
            resolve();
          },
          err => {
            console.log(
              `[RESTPlaylistsService] addVideo(${playlistId}, video: ${
                video.id
              }) ERROR: ` + JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  removeVideo(playlistId: string, videoId: string): Promise<void> {
    console.log(
      `[RESTPlaylistsService] removeVideo(${playlistId}, video: ${videoId})`
    );
    return new Promise((resolve, reject) => {
      this.http
        .delete(
          `${this.rootUrl}/users/${
            this.userId
          }/playlists/${playlistId}/videos/${videoId}`,
          {
            params: { token: this.token }
          }
        )
        .subscribe(
          () => {
            resolve();
          },
          err => {
            console.log(
              `[RESTPlaylistsService] removeVideo(${playlistId}, video: ${videoId}) ERROR: ` +
                JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  async listVideos(playlistId: string): Promise<Video[]> {
    console.log(`[RESTPlaylistsService] listVideos(${playlistId})`);

    let videos: Video[] = await this.http
      .get<Video[]>(
        `${this.rootUrl}/users/${this.userId}/playlists/${playlistId}/videos`,
        {
          params: { token: this.token }
        }
      )
      .toPromise();
    let fullVideos = [];
    for (const video of videos) {
      if (video.type !== "local") {
        let videoYT = await this.youtube.findVideoById(video.id);
        fullVideos.push(videoYT);
      } else {
        fullVideos.push(video);
      }
    }

    return fullVideos;
  }

  updateVideos(playlistId: string, videos: Video[]): Promise<Video[]> {
    console.log(
      `[RESTPlaylistsService] updateVideos(${playlistId}, videos: ${
        videos.length
      })`
    );
    return new Promise((resolve, reject) => {
      this.http
        .put(
          `${this.rootUrl}/users/${this.userId}/playlists/${playlistId}/videos`,
          { videos: videos },
          {
            params: { token: this.token }
          }
        )
        .subscribe(
          () => {
            resolve();
          },
          err => {
            console.log(
              `[RESTPlaylistsService] removeVideo(${playlistId}, video: ${
                videos.length
              }) ERROR: ` + JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

   
}
