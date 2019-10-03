import {createAction, props} from '@ngrx/store';
import {Video} from '../videos/video';

export const listLoad = createAction('[VIDEO] list load');
export const listSuccess = createAction('[VIDEO] list success', props<{ videos: Video[] }>());
export const search = createAction('[VIDEO] search', props<{ term: string }>());
