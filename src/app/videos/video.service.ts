import {Injectable} from '@angular/core';
import {Video} from './video';
import {PLAYLIST, VIDEOS} from './mock-videos';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor() {}

  getVideo(id: number): Observable<Video> {
    const index = VIDEOS.findIndex(video => video.id === id);

    return of(VIDEOS[index]).pipe(delay(500));
  }

  getVideos(): Observable<Video[]> {
    return of(VIDEOS).pipe(delay(500));
  }

  getPlaylist(): Observable<Video[]> {
    return of(PLAYLIST).pipe(delay(500));
  }

  addToPlaylist(video: Video) {
    return new Observable<Video>(subscriber => {
      PLAYLIST.push(video);
      subscriber.next(video);
      subscriber.complete();
    }).pipe(delay(500));
  }

  removeFromPlaylist(video) {
    return new Observable<Video>(subscriber => {
      const id = PLAYLIST.findIndex(value => value.id === video.id);
      PLAYLIST.splice(id, 1);

      subscriber.next(video);
      subscriber.complete();
    }).pipe(delay(500));
  }
}
