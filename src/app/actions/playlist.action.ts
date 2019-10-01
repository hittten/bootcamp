import {createAction, props} from '@ngrx/store';
import {Video} from '../videos/video';

export const add = createAction('[playlist] Add', props<Video>());
export const remove = createAction('[playlist] Remove', props<Video>());
export const clear = createAction('[playlist] Clear');
