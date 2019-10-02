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
} from './actions/playlist.action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {VideoService} from './videos/video.service';
import {of} from 'rxjs';
import {newError} from './actions/error.actions';

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
      map(video => addSuccess({video})),
    )),
  ));

  removeFromPlaylist$ = createEffect(() => this.actions$.pipe(
    ofType(remove),
    mergeMap((action) => this.videoService.removeFromPlaylist(action.video).pipe(
      map(video => removeSuccess({video})),
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
