import {Component, OnInit} from '@angular/core';
import {Video} from '../video';
import {VideoService} from '../video.service';
import {Observable} from 'rxjs';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import {State} from '../../reducers';
import {clear, remove} from '../../actions/playlist.action';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  playlist$: Observable<Video[]>;

  constructor(private videoService: VideoService, private store: Store<State>) {
    this.playlist$ = this.store.select(fromRoot.selectPlaylist);
  }

  ngOnInit() {
  }

  removeFromPlaylist(video: Video, button: HTMLButtonElement, element: HTMLDivElement) {
    this.store.dispatch(remove(video));
    button.disabled = true;
    // this.videoService.removeFromPlaylist(video).subscribe(removedVideo => {
    //   element.remove();
    //   console.log('removed from list:', removedVideo.title);
    //   button.disabled = false;
    // });
  }

  clearPlaylist() {
    this.store.dispatch(clear());
  }
}
