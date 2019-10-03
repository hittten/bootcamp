import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {VideoService} from '../videos/video.service';
import {listLoad, listSuccess, search} from '../actions/video.actions';

@Injectable()
export class VideoEffects {
  getVideos$ = createEffect(() => this.actions$.pipe(
    ofType(listLoad),
    mergeMap(() => this.videoService.getVideos().pipe(
      map(videos => listSuccess({videos})),
    )),
  ));

  getVideosSearch$ = createEffect(() => this.actions$.pipe(
    ofType(search),
    switchMap(action => this.videoService.getVideos(action.term).pipe(
      map(videos => listSuccess({videos})),
    )),
  ));

  constructor(
    private actions$: Actions,
    private videoService: VideoService,
  ) {
  }
}
