import {Component, OnInit} from '@angular/core';
import {PLAYLIST, VIDEOS} from '../mock-videos';
import {Video} from '../video';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  videos = VIDEOS;
  playlist = PLAYLIST;

  constructor() {
  }

  ngOnInit() {
  }

  // TODO: open detail
  openDetail(video: Video) {
    alert(`TODO open detail ${video.title}`);
  }

  addToPlaylist(video: Video) {
    this.playlist.push(video);
  }
}
