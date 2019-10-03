import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {login, loginFail, loginSuccess, logout, logoutSuccess} from '../actions/user.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {newError} from '../actions/error.actions';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(action => {
          return this.authService.login(action.email, action.password).pipe(
            tap(() => {
              const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/';

              this.router.navigateByUrl(redirect);
            }),
            map(user => loginSuccess({user})),
            catchError((error: HttpErrorResponse) => {
              const message = error.error.error.errors[0].message;

              return of(loginFail(), newError({error: message}));
            }),
          );
        },
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        this.authService.logout();

        return logoutSuccess();
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
  }
}
