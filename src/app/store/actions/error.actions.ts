import {createAction, props} from '@ngrx/store';

export const newError = createAction('[ERROR] new', props<{ error: string }>());
export const clearError = createAction('[ERROR] clear');
