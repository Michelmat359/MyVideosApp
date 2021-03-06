import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { VideosService } from './videos.service';
@Injectable()
export class MemoryVideosService extends VideosService {
  private videos: Video[] = [];
  private nextId = 0;

  constructor() { super();
    // this.videos.push(
    //   {
    //     id:'0',
    //     type:'local',
    //     url:'/assets/videos/Android.mp4',
    //     title:'Android',
    //     description:'Android video',
    //     thumbnail: {
    //       width: 720, 
    //       url: '/assets/videos/android.jpg',
    //       height: 1280,
    //     },
    //     tags:'video',
    //     duration:'',
    //     date:'',
    //     width:450,   
    //   },
    //   {
    //     id:'1',
    //     type:'local',
    //     url:'/assets/videos/apple.mp4',
    //     title:'Apple',
    //     description:'Apple video',
    //     thumbnail: {
    //       width: 720, 
    //       url: '/assets/videos/apple.jpg',
    //       height: 1280,
    //     },
    //     tags:'video',
    //     duration:'',
    //     date:'',
    //     width:450,   
    //   },
    //   {
    //     id:'2',
    //     type:'local',
    //     url:'/assets/videos/samsung.mp4',
    //     title:'Samsung',
    //     description:'Samsung video',
    //     thumbnail: {
    //       width: 720, 
    //       url: '/assets/videos/samsung.jpg',
    //       height: 1280,
    //     },
    //     tags:'video',
    //     duration:'',
    //     date:'',
    //     width:450,   
    //   });
  
  }

  findVideos(query: string): Promise<Video[]> {
    console.log(`[MemoryVideosService] findVideos(${query})`);
    return new Promise((resolve, reject) => {
      let _videos = this.videos.filter((video) => {
        return video.title.indexOf(query) !== -1;
      }).map((video) => this.clone(video));
      resolve(_videos);
    });
  }

  findVideoById(id: string): Promise<Video> {
    console.log(`[MemoryVideosService] findVideoById(${id})`);
    var index = this.videos.findIndex((video) => video.id === id);
    return new Promise((resolve, reject) => {
      resolve((index === -1) ? null : this.clone(this.videos[index]));
    });
  }


  addVideo(video: Video): Promise<Video> {
    console.log('[MemoryVideosService] addVideo(' + JSON.stringify(video) +')');
    let _video = this.clone(video);
    _video.id = String(this.nextId++);
    this.videos.push(_video);
    return new Promise((resolve, reject) => resolve(this.clone(_video)));
  }

  removeVideo(id: string): Promise<void> {
    console.log(`[MemoryVideosService] removeVideo(${id})`);
    var index = this.videos.findIndex((video) => video.id === id);
    if (index !== -1) {
      this.videos.splice(index, 1);
      return new Promise((resolve, reject) => resolve());
    } else {
      return new Promise((resolve, reject) => reject(new Error(`Video with id $
{id} not found`)));
    }
  }

  updateVideo(video: Video): Promise<Video> {
    console.log('[MemoryVideosService] updateVideo(' + JSON.stringify(video) +
      ')');
    var index = this.videos.findIndex((_video) => _video.id === video.id);
    if (index !== -1) {
      this.videos[index] = this.clone(video);
      return new Promise((resolve, reject) => resolve(this.clone(video)));
    } else {
      return new Promise((resolve, reject) => reject(new Error(`Video with id $
{video.id} not found`)));
    }
  }
  private clone(video: Video): Video {
    console.log(video);
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
}