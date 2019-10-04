import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  add,
  addSuccess,
  clear,
  clearFail,
  clearSuccess,
  listLoad,
  listSuccess,
  remove,
  removeFail,
  removeSuccess,
} from '../actions/playlist.action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {newError} from '../actions/error.actions';
import {VideoService} from '../../videos/video.service';
import {showMessage} from '../actions/snack-bar.actions';

@Injectable()
export class PlaylistEffects {
  getPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(listLoad),
    mergeMap(() => this.videoService.getPlaylist().pipe(
      map(videos => listSuccess({videos})),
    )),
  ));

  addToPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(add),
    mergeMap((action) => this.videoService.addToPlaylist(action.video).pipe(
      mergeMap(video => [
        addSuccess({video}),
        showMessage({message: 'Added to playlist'}),
      ]),
    )),
  ));

  removeFromPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(remove),
    mergeMap((action) => this.videoService.removeFromPlaylist(action.video).pipe(
      mergeMap(video => [
        removeSuccess({video}),
        showMessage({message: 'Removed from playlist'}),
      ]),
      catchError(() => of(removeFail(), newError({error: 'Error removing video from playlist'}))),
    )),
  ));

  clearPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(clear),
    mergeMap(() => this.videoService.clearPlaylist().pipe(
      map(() => clearSuccess()),
      catchError(() => of(clearFail(), newError({error: 'Error deleting playlist'}))),
    )),
  ));

  constructor(
    private actions$: Actions,
    private videoService: VideoService,
  ) {
  }
}
