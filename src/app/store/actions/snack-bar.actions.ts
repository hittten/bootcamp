import {createAction, props} from '@ngrx/store';

export const showMessage = createAction('[SNACK BAR] shown', props<{ message: string }>());
