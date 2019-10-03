import {Component, OnDestroy, OnInit} from '@angular/core';
import {Video} from '../video';
import {VideoService} from '../video.service';
import {Router} from '@angular/router';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectVideoList, selectVideoLoading, State} from '../../reducers';
import {add} from '../../actions/playlist.action';
import {listLoad, search} from '../../actions/video.actions';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  private searchTerms = new Subject<string>();
  private searchSubscription: Subscription;

  videos$: Observable<Video[]>;
  loading$: Observable<boolean>;

  constructor(
    private videoService: VideoService,
    private router: Router,
    private store: Store<State>,
  ) {
    this.videos$ = this.store.select(selectVideoList);
    this.loading$ = this.store.select(selectVideoLoading);

    this.searchSubscription = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap(term => of(term)),
    )
      .subscribe(term => this.store.dispatch(search({term})));
  }

  ngOnInit() {
    this.store.dispatch(listLoad());
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
    this.searchSubscription.unsubscribe();
  }
}
