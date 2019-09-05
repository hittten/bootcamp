import {Component, OnInit} from '@angular/core';
import {PLAYLIST} from '../mock-videos';
import {Video} from '../video';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  playlist = PLAYLIST;

  constructor() {
  }

  ngOnInit() {
  }

  removeFromPlaylist(video: Video) {
    const id = this.playlist.findIndex(value => value.id === video.id);
    this.playlist.splice(id, 1);
  }
}
