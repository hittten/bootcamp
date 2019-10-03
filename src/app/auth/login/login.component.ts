import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {User} from '../../store/reducers/user.reducer';
import {State} from '../../store/reducers';
import {selectUser} from '../../store/selectors';
import {login, logout} from '../../store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user$: Observable<User>;

  constructor(public authService: AuthService, private store: Store<State>) {
    this.user$ = this.store.select(selectUser);
  }

  login(email: string, password: string) {
    this.store.dispatch(login({email, password}));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
