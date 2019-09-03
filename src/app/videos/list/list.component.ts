import {Component, OnInit} from '@angular/core';
import {VIDEOS} from '../mock-videos';
import {Video} from '../video';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  private videos = VIDEOS;

  constructor() {
  }

  ngOnInit() {
  }

  // TODO: open detail
  openDetail(video: Video) {
    alert(`TODO open detail ${video.title}`);
  }
}
