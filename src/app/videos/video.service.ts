import {Injectable} from '@angular/core';
import {Video} from './video';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient, private authService: AuthService) {
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
    return new Observable<Video[]>(subscriber => {
      this.authService.getToken().subscribe(token => {
        const headers = this.getAuthHeader(token);

        this.http.get<Video[]>(environment.apiUrl + 'getPlaylist', headers)
          .subscribe(videos => subscriber.next(videos));
      });
    });
  }

  addToPlaylist(video: Video): Observable<Video> {
    return new Observable<Video>(subscriber => {
      this.authService.getToken().subscribe(token => {
        const headers = this.getAuthHeader(token);

        this.http.post<Video>(environment.apiUrl + 'addToPlaylist', {id: video.id}, headers)
          .subscribe(newVideo => subscriber.next(newVideo));
      });
    });
  }

  removeFromPlaylist(video): Observable<Video> {
    return new Observable<Video>(subscriber => {
      this.authService.getToken().subscribe(token => {
        const headers = this.getAuthHeader(token);

        this.http.post<Video>(environment.apiUrl + 'removeFromPlaylist', {id: video.id}, headers)
          .subscribe(newVideo => subscriber.next(newVideo));
      });
    });
  }

  private getAuthHeader(token: string) {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
  }
}
