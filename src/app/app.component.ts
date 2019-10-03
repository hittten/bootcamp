import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ErrorMessage} from './store/reducers/error-message.reducer';
import {State} from './store/reducers';
import {selectError} from './store/selectors';
import {clearError} from './store/actions/error.actions';

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
