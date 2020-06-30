import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { VideosService } from "./videos.service";
import { Video } from "../models/video";


@Injectable({
  providedIn: 'root'
})
export class RESTVideosService extends VideosService {

  private rootUrl = 'http://localhost:8080/myvideos';
  private token: string;
  private userId: string;

  constructor(private users: UserService, private http: HttpClient) {
    super();
    this.token = users.getSessionToken();
    this.userId = users.getSessionUser().id;
  }

  findVideos(query: string): Promise<Video[]> {
    console.log(`[RESTVideosService] findVideos(${query})`);
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.rootUrl}/users/${this.userId}/videos`, {
          params: { token: this.token, q: query }
        })
        .subscribe(
          (data: [Video]) => {
            resolve(data);
          },
          err => {
            console.log(
              `[RESTVideosService] findVideos(${query}) ERROR: ` +
                JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  findVideoById(id: string): Promise<Video> {
    console.log(`[RESTVideosService] findVideoById(${id})`);
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.rootUrl}/users/${this.userId}/videos/${id}`, {
          params: { token: this.token }
        })
        .subscribe(
          (data: Video) => {
            resolve(data);
          },
          err => {
            console.log(
              `[RESTVideosService] findVideoById(${id}) ERROR: ` +
                JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  addVideo(video: Video): Promise<Video> {
    console.log(`[RESTVideosService] addVideo(${video.title})`);
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.rootUrl}/users/${this.userId}/videos`,
          video,
          {
            params: { token: this.token }
          }
        )
        .subscribe(
          (data: Video) => {
            resolve(data);
          },
          err => {
            console.log(
              `[RESTVideosService] findVideoById(${video.title}) ERROR: ` +
                JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  removeVideo(id: string): Promise<void> {
    console.log(`[RESTVideosService] removeVideo(${id})`);
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.rootUrl}/users/${this.userId}/videos/${id}`, {
          params: { token: this.token }
        })
        .subscribe(
          (data: any) => {
            resolve();
          },
          err => {
            console.log(
              `[RESTVideosService] removeVideo(${id}) ERROR: ` +
                JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  updateVideo(video: Video): Promise<Video> {
    console.log(`[RESTVideosService] updateVideo(${video.id})`);
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.rootUrl}/users/${this.userId}/videos/${video.id}`, video, {
          params: { token: this.token }
        })
        .subscribe(
          (data: Video) => {
            resolve(data);
          },
          err => {
            console.log(
              `[RESTVideosService] updateVideo(${video.id}) ERROR: ` +
                JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }
}
