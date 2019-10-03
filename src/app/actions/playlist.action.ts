import {createAction, props} from '@ngrx/store';
import {Video} from '../videos/video';

export const listLoad = createAction('[PLAYLIST] list load');
export const listSuccess = createAction('[PLAYLIST] list success', props<{videos: Video[]}>());
export const add = createAction('[PLAYLIST] Add', props<{video: Video}>());
export const addSuccess = createAction('[PLAYLIST] Add Success', props<{video: Video}>());
export const remove = createAction('[PLAYLIST] Remove', props<{video: Video}>());
export const removeSuccess = createAction('[PLAYLIST] Remove Success', props<{video: Video}>());
export const removeFail = createAction('[PLAYLIST] Remove Fail');
export const clear = createAction('[PLAYLIST] Clear');
export const clearSuccess = createAction('[PLAYLIST] Clear Success');
export const clearFail = createAction('[PLAYLIST] Clear Fail');
