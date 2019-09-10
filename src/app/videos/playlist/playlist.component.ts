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
import {Video} from '../video';
import {VideoService} from '../video.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent
  implements OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  playlist: Video[];

  constructor(private videoService: VideoService) {
    this.videoService.showCount();
    this.playlist = this.videoService.getPlaylist();
    console.log('PlaylistComponent constructor');
  }

  ngOnInit() {
    console.log('PlaylistComponent ngOnInit');
  }

  ngAfterContentChecked(): void {
    console.log('PlaylistComponent ngAfterContentChecked');
  }

  ngAfterContentInit(): void {
    console.log('PlaylistComponent ngAfterContentInit');
  }

  ngAfterViewChecked(): void {
    console.log('PlaylistComponent ngAfterViewChecked');
  }

  ngAfterViewInit(): void {
    console.log('PlaylistComponent ngAfterViewInit');
  }

  ngDoCheck(): void {
    console.log('PlaylistComponent ngDoCheck');
  }

  ngOnDestroy(): void {
    console.log('PlaylistComponent ngOnDestroy');
  }

  removeFromPlaylist(video: Video) {
    const id = this.playlist.findIndex(value => value.id === video.id);
    this.playlist.splice(id, 1);
  }
}
