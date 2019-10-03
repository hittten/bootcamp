import {Component, OnInit} from '@angular/core';
import {Video} from '../video';
import {VideoService} from '../video.service';
import {Observable} from 'rxjs';
import * as fromRoot from '../../store/selectors';
import {Store} from '@ngrx/store';
import {State} from '../../store/reducers';
import {clear, listLoad, remove} from '../../store/actions/playlist.action';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  playlist$: Observable<Video[]>;
  loading$: Observable<boolean>;

  constructor(private videoService: VideoService, private store: Store<State>) {
    this.playlist$ = this.store.select(fromRoot.selectPlaylistList);
    this.loading$ = this.store.select(fromRoot.selectPlaylistLoading);
  }

  ngOnInit() {
    this.store.dispatch(listLoad());
  }

  removeFromPlaylist(video: Video) {
    this.store.dispatch(remove({video}));
  }

  clearPlaylist() {
    this.store.dispatch(clear());
  }
}
