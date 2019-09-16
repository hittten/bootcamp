import {Injectable} from '@angular/core';
import {Video} from './video';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {
  }

  getVideo(id: number): Observable<Video> {
    return this.http.get<Video>(environment.apiUrl + 'getVideo?id=' + id);
  }

  getVideos(search?: string): Observable<Video[]> {
    if (!search) {
      return this.http.get<Video[]>(environment.apiUrl + 'getVideos');
    }

    return this.http.get<Video[]>(environment.apiUrl + 'getVideos?search=' + search);
  }

  getPlaylist(): Observable<Video[]> {
    return this.http.get<Video[]>(environment.apiUrl + 'getPlaylist');
  }

  addToPlaylist(video: Video) {
    return this.http.post<Video>(environment.apiUrl + 'addToPlaylist', {id: video.id});
  }

  removeFromPlaylist(video) {
    return this.http.post<Video>(environment.apiUrl + 'removeFromPlaylist', {id: video.id});
  }
}
