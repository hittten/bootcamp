import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  isLoggedIn(): boolean {
    if (this.getCookie('token') || this.getCookie('refreshToken')) {
      return true;
    }

    return false;
  }

  login(): Observable<boolean> {
    return new Observable(subscriber => {
      const body = {email: 'gilberto.amb@gmail.com', password: '123456', returnSecureToken: true};

      const subscription = this.http.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArolz8c11XA31DGbR_nKtqjzbuf29HeHc',
        body,
      )
        .subscribe((token: any) => {
          document.cookie = `token=${token.idToken};max-age=${token.expiresIn}`;
          document.cookie = `refreshToken=${token.refreshToken}`;
          subscriber.next(true);
          subscription.unsubscribe();
        }, (error) => {
          subscriber.error(error);
        });
    });
  }

  getToken(): Observable<string | null> {
    const token = this.getCookie('token');

    if (token) {
      return of(token);
    }

    const refreshToken = this.getCookie('refreshToken');

    if (refreshToken) {
      return this.getRefreshToken(refreshToken);
    }

    return of(null);
  }

  logout(): void {
    document.cookie = 'token=""; max-age=0';
    document.cookie = 'refreshToken=""; max-age=0';
  }

  private getRefreshToken(refreshToken: string) {
    return new Observable<string>(subscriber => {
      const body = {grant_type: 'refresh_token', refresh_token: refreshToken};
      const subscription = this.http.post(
        'https://securetoken.googleapis.com/v1/token?key=AIzaSyArolz8c11XA31DGbR_nKtqjzbuf29HeHc',
        body,
      )
        .subscribe((token: any) => {
          document.cookie = `token=${token.access_token};max-age=${token.expires_in}`;
          document.cookie = `refreshToken=${token.refresh_token}`;
          subscriber.next(token.access_token);
          subscription.unsubscribe();
        });
    });
  }

  private getCookie(name: string) {
    const reg = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`);
    return document.cookie.replace(reg, '$1');
  }
}
