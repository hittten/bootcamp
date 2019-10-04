import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loginCheck, login, loginFail, loginSuccess, logout, logoutSuccess} from '../actions/user.actions';
import {catchError, exhaustMap, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {newError} from '../actions/error.actions';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {showMessage} from '../actions/snack-bar.actions';

@Injectable()
export class UserEffects {
  checkLogin$ = createEffect(() => this.actions$.pipe(
    ofType(loginCheck),
    mergeMap(() => {
      if (!this.authService.isLoggedIn()) {
        return [loginFail()];
      }
      return this.authService.getUser().pipe(
        map(user => loginSuccess({user})),
        catchError((error) => {
          console.error(error);
          this.authService.logout();

          return of(loginFail());
        }),
      );
    }),
  ));

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(action => {
          return this.authService.login(action.email, action.password).pipe(
            tap(() => {
              const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/';

              this.router.navigateByUrl(redirect);
            }),
            mergeMap(user => [
              loginSuccess({user}),
              showMessage({message: 'Welcome ' + user.email}),
            ]),
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
      mergeMap(() => {
        this.authService.logout();

        return [logoutSuccess(), showMessage({message: 'Bye!'})];
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
