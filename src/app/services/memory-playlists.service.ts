import { Injectable } from '@angular/core';
import { PlaylistsService } from "./playlists.service";
import { Playlist } from "../models/playlist";
import { Video } from '../models/video';
import { VideosService } from './videos.service';
import { MemoryVideosService } from './memory-videos.service';
import { YoutubeVideosService } from "./youtube-videos.service";



@Injectable({
  providedIn: "root"
})
export class MemoryPlaylistsService extends PlaylistsService {
  //private videos: Video[] = [];
  private playlists: Playlist[] = [];
  private aux = 0;
  private playlistsTotal: { playlistId: string; videos: string[] }[] = [];
  constructor(
    private memoryVideosService: MemoryVideosService,
    private youtubeService: YoutubeVideosService
  ) { super(); }


  findPlaylists(): Promise<Playlist[]> {
    console.log(`[MemoryPlaylistsService] findPlaylists()`);
    return new Promise((resolve, reject) => {
      let _playlists = this.playlists.map(playlist => this.clone(playlist));
      resolve(_playlists);
    });
  }

  addPlaylist(playlist: Playlist): Promise<Playlist> {
    console.log('[MemoryPlaylistService] addPlaylist(' + JSON.stringify(playlist) + ')');
    let _playlist = this.clone(playlist);
    _playlist.id = String(this.aux++);
    this.playlists.push(_playlist);
    console.log(this.playlists);
    return new Promise((resolve, reject) => resolve(this.clone(_playlist)));
  }

  removePlaylist(playlistId: string): Promise<void> {
    console.log(`[MemoryPlaylistService] removePlaylist(${playlistId})`);
    var index = this.playlists.findIndex((playlist) => playlist.id === playlistId);
    if (index !== -1) {
      this.playlists.splice(index, 1);
      return new Promise((resolve, reject) => resolve());
    } else {
      return new Promise((resolve, reject) => reject(new Error(`Playlist with id ${playlistId} not found`)));
    }
  }

  updatePlaylist(playlist: Playlist): Promise<Playlist> {
    console.log('[MemoryPlaylistService] updateVideo(' + JSON.stringify(playlist) + ')');
    var index = this.playlists.findIndex((_playlist) => _playlist.id === playlist.id);
    if (index !== -1) {
      this.playlists[index] = this.clone(playlist);
      return new Promise((resolve, reject) => resolve(this.clone(playlist)));
    } else {
      return new Promise((resolve, reject) => reject(new Error(`Playlist with id $playlist.id} not found`)));
    }
  }


  addVideo(playlistId: string, video: Video): Promise<void> {
    console.log('[MemoryPlaylistsService] addVideo(' + JSON.stringify(playlistId) + ', ' + JSON.stringify(video.id) + ')');
   
    var index = this.playlists.findIndex(_playlist => _playlist.id === playlistId);
    if (index !== -1) {
      this.playlists[index].count += 1;
      var indexPlaylist = this.playlistsTotal.findIndex(_playlist => _playlist.playlistId === playlistId);
      if (indexPlaylist !== -1) {
        this.playlistsTotal[indexPlaylist].videos.push(video.id);
      } else {
        this.playlistsTotal.push({ playlistId: playlistId, videos: [video.id] });
      }
      return new Promise((resolve, reject) => resolve());
    } else {
      return new Promise((resolve, reject) =>
        reject(new Error(`Playlist with id ${playlistId} not found`))
      );
    }
  }


  removeVideo(playlistId: string, videoId: string): Promise<void> {
    console.log('[MemoryPlaylistsService] addVideo(${playlistId), ${videoId))');
    var index = this.playlists.findIndex(_playlist => _playlist.id = playlistId);
    if (index !== -1) {
      var indexPlaylist = this.playlistsTotal.findIndex(_playlist => _playlist.playlistId === playlistId);
      var indexVideos = this.playlistsTotal[indexPlaylist].videos.findIndex(_videoId => _videoId === videoId);
      if (indexPlaylist !== -1 && indexVideos !== -1) {
        //this.videos.splice(index, 1);
        this.playlistsTotal[indexPlaylist].videos.splice(indexVideos, 1);
        return new Promise((resolve, reject) => resolve());
      }else {
      return new Promise((resolve, reject) => reject(new Error(`not found`)));
      }
    }else{
      return new Promise((resolve, reject) => reject(new Error(`not found`)));
    }
  }

  async listVideos(playlistId: string): Promise<Video[]> {
    
    console.log(`[MemoryPlaylistsService] listVideos(${playlistId})`);
    var index = this.playlists.findIndex(_playlist => _playlist.id = playlistId);
    if (index !== -1) {
      var indexPlaylist = this.playlistsTotal.findIndex(_playlist => _playlist.playlistId === playlistId);
      let _videos: Video[] = [];
      if (indexPlaylist !== -1) {
        //Hay que mirar si es de youtube o de los archivos subidos
        console.log(this.playlistsTotal[indexPlaylist].videos);
        for (const videoId of this.playlistsTotal[indexPlaylist].videos) {
          console.log(videoId);
          var id = videoId.toString(); 
          var video = await this.memoryVideosService.findVideoById(id);
          console.log(video);
          if (!video) {
            video = await this.youtubeService.findVideoById(id);
          }
          _videos.push(video);
        }
      }
      return _videos;
    }else{
      throw new Error(`not found`);
    }
  }

  private clonev(video: Video): Video {
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


}
