import {Component, OnInit} from '@angular/core';
import {Video} from '../video';
import {VideoService} from '../video.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  videos$: Observable<Video[]>;
  playlist$: Observable<Video[]>;

  constructor(private videoService: VideoService, private router: Router) {
    this.videos$ = this.videoService.getVideos();
    this.playlist$ = this.videoService.getPlaylist();
  }

  ngOnInit() {
  }

  openDetail(video: Video) {
    this.router.navigate(['/detail/', video.id]);
  }

  addToPlaylist(video: Video, button: HTMLButtonElement) {
    button.disabled = true;
    this.videoService.addToPlaylist(video).subscribe(newVideo => {
      console.log('added to list:', newVideo.title);
      button.disabled = false;
    });
  }
}
