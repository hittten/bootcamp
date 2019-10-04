import {createAction, props} from '@ngrx/store';
import {User} from '../reducers/user.reducer';

export const login = createAction('[USER] login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[USER] login success', props<{ user: User }>());
export const loginFail = createAction('[USER] login Fail');

export const logout = createAction('[USER] logout');
export const logoutSuccess = createAction('[USER] logout success');

export const loginCheck = createAction('[USER] check login');
