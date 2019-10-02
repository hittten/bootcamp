import {Component, OnDestroy, OnInit} from '@angular/core';
import {Video} from '../video';
import {VideoService} from '../video.service';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {State} from '../../reducers';
import {add} from '../../actions/playlist.action';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  private videos$: Observable<Video[]>;
  private searchTerms = new BehaviorSubject<string>('');
  private videoSubscription: Subscription;

  videos: Video[];
  loading = true;

  constructor(private videoService: VideoService, private router: Router, private store: Store<State>) {
    this.videos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        this.loading = true;
        return this.videoService.getVideos(term).pipe(tap(() => this.loading = false));
      }),
    );
  }

  ngOnInit() {
    this.videoSubscription = this.videos$.subscribe(videos => this.videos = videos);
  }

  openDetail(video: Video) {
    this.router.navigate(['/detail/', video.id]);
  }

  addToPlaylist(video: Video) {
    this.store.dispatch(add({video}));
  }

  search(value: string) {
    this.searchTerms.next(value);
  }

  ngOnDestroy(): void {
    this.videoSubscription.unsubscribe();
  }
}
