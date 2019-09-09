import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {PLAYLIST, VIDEOS} from '../mock-videos';
import {Video} from '../video';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent
  implements OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  videos = VIDEOS;
  playlist = PLAYLIST;

  constructor() {
    console.log('ListComponent constructor');
  }

  ngOnInit() {
    console.log('ListComponent ngOnInit');
  }

  ngAfterContentChecked(): void {
    console.log('ListComponent ngAfterContentChecked');
  }

  ngAfterContentInit(): void {
    console.log('ListComponent ngAfterContentInit');
  }

  ngAfterViewChecked(): void {
    console.log('ListComponent ngAfterViewChecked');
  }

  ngAfterViewInit(): void {
    console.log('ListComponent ngAfterViewInit');
  }

  ngDoCheck(): void {
    console.log('ListComponent ngDoCheck');
  }

  ngOnDestroy(): void {
    console.log('ListComponent ngOnDestroy');
  }

  // TODO: open detail
  openDetail(video: Video) {
    alert(`TODO open detail ${video.title}`);
  }

  addToPlaylist(video: Video) {
    this.playlist.push(video);
  }
}
