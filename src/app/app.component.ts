import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ErrorMessage} from './reducers/error-message.reducer';
import {Store} from '@ngrx/store';
import {selectError, State} from './reducers';
import {clearError} from './actions/error.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  error$: Observable<ErrorMessage>;

  constructor(private store: Store<State>) {
    this.error$ = this.store.select(selectError);
  }

  closeMessage() {
    this.store.dispatch(clearError());
  }
}
