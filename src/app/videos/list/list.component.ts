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
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent
  implements OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  videos: Video[];
  playlist: Video[];

  constructor(private videoService: VideoService, private router: Router) {
    videoService.addCount();
    this.videos = this.videoService.getVideos();
    this.playlist = this.videoService.getPlaylist();
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

  openDetail(video: Video) {
    this.router.navigate(['/detail/', video.id]);
  }

  addToPlaylist(video: Video) {
    this.playlist.push(video);
  }
}
