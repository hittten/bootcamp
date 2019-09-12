import {Component, OnInit} from '@angular/core';
import {Video} from '../video';
import {VideoService} from '../video.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  playlist$: Observable<Video[]>;

  constructor(private videoService: VideoService) {
    this.playlist$ = this.videoService.getPlaylist();
  }

  ngOnInit() {
  }

  removeFromPlaylist(video: Video, button: HTMLButtonElement) {
    button.disabled = true;
    this.videoService.removeFromPlaylist(video).subscribe(removedVideo => {
      console.log('removed from list:', removedVideo.title);
      button.disabled = false;
    });
  }
}
