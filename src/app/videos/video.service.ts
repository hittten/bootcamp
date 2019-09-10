import {Injectable} from '@angular/core';
import {Video} from './video';
import {PLAYLIST, VIDEOS} from './mock-videos';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private count: number;

  constructor() {
    this.count = 0;
  }

  addCount() {
    this.count++;
    console.log(this.count);
  }

  showCount() {
    console.log(this.count);
  }

  getVideo(id: number): Observable<Video> {
    const index = VIDEOS.findIndex(video => video.id === id);

    return of(VIDEOS[index]);
  }

  getVideos(): Observable<Video[]> {
    return of(VIDEOS);
  }

  getPlaylist(): Observable<Video[]> {
    return of(PLAYLIST);
  }
}
