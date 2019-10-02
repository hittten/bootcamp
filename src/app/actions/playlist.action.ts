import {createAction, props} from '@ngrx/store';
import {Video} from '../videos/video';

export const listLoad = createAction('[playlist] list load');
export const listSuccess = createAction('[playlist] list success', props<{videos: Video[]}>());
export const add = createAction('[playlist] Add', props<{video: Video}>());
export const addSuccess = createAction('[playlist] Add Success', props<{video: Video}>());
export const remove = createAction('[playlist] Remove', props<{video: Video}>());
export const removeSuccess = createAction('[playlist] Remove Success', props<{video: Video}>());
export const removeFail = createAction('[playlist] Remove Fail');
export const clear = createAction('[playlist] Clear');
export const clearSuccess = createAction('[playlist] Clear Success');
export const clearFail = createAction('[playlist] Clear Fail');
