import {Injectable} from '@angular/core';
import {Video} from './video';
import {PLAYLIST, VIDEOS} from './mock-videos';

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

  getVideo(id: number): Video {
    const index = this.getVideos().findIndex(video => video.id === id);

    return this.getVideos()[index];
  }

  getVideos(): Video[] {
    return VIDEOS;
  }

  getPlaylist(): Video[] {
    return PLAYLIST;
  }
}
