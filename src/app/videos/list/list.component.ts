import {Component, OnInit} from '@angular/core';
import {Video} from '../video';
import {VideoService} from '../video.service';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  videos$: Observable<Video[]>;
  playlist$: Observable<Video[]>;
  private searchTerms = new BehaviorSubject<string>('');

  constructor(private videoService: VideoService, private router: Router) {
    this.videos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.videoService.getVideos(term)),
    );
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

  search(value: string) {
    this.searchTerms.next(value);
  }
}
