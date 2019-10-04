import {createReducer, on} from '@ngrx/store';
import {loginSuccess, logoutSuccess} from '../actions/user.actions';

export interface User {
  id: string;
  email: string;
}

export const initialState: User = null;

const user = createReducer(initialState,
  on(loginSuccess, (_, action) => action.user),
  on(logoutSuccess, () => null),
);

export function userReducer(state, action) {
  return user(state, action);
}
