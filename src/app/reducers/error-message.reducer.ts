import {createReducer, on} from '@ngrx/store';
import {clearError, newError} from '../actions/error.actions';

export type ErrorMessage = string | null;

export const initialState: ErrorMessage = null;

const error = createReducer(initialState,
  on(newError, (_, action) => action.error),
  on(clearError, () => null),
);

export function errorMessageReducer(state, action) {
  return error(state, action);
}
