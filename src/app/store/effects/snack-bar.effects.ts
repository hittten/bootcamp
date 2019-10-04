import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {newError} from '../actions/error.actions';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {showMessage} from '../actions/snack-bar.actions';

@Injectable()
export class SnackBarEffects {

  showError$ = createEffect(() =>
      this.actions$.pipe(
        ofType(newError),
        tap(action => this.snackBar.open(action.error, 'close')),
      ),
    {dispatch: false},
  );

  showMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(showMessage),
        tap(action => this.snackBar.open(action.message, '', {duration: 3000})),
      ),
    {dispatch: false},
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {
  }
}
