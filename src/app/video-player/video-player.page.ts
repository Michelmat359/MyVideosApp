import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})
export class VideoPlayerPage implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
