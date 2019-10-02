import {Injectable} from '@angular/core';
import {Video} from './video';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {switchMap} from 'rxjs/operators';

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
    return this.authService.getToken().pipe(
      switchMap(token => this.http.get<Video[]>(environment.apiUrl + 'getPlaylist', this.getAuthHeader(token))),
    );
  }

  addToPlaylist(video: Video): Observable<Video> {
    return this.authService.getToken().pipe(
      switchMap(token => this.http.post<Video>(environment.apiUrl + 'addToPlaylist', {id: video.id}, this.getAuthHeader(token))),
    );
  }

  removeFromPlaylist(video): Observable<Video> {
    return this.authService.getToken().pipe(
      switchMap(token => this.http.post<Video>(environment.apiUrl + 'removeFromPlaylist', {id: video.id}, this.getAuthHeader(token))),
    );
  }

  clearPlaylist(): Observable<void> {
    return this.authService.getToken().pipe(
      switchMap(token => this.http.delete<void>(environment.apiUrl + 'clearPlaylist', this.getAuthHeader(token))),
    );
  }

  private getAuthHeader(token: string) {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
  }
}
