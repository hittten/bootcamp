import {createReducer, on} from '@ngrx/store';
import {Video} from '../videos/video';
import {listLoad, listSuccess, search} from '../actions/video.actions';

export interface VideoList {
  list: Video[];
  loading: boolean;
}

export const initialState: VideoList = {
  list: [],
  loading: false,
};

const video = createReducer(initialState,
  on(listLoad, (state) => ({...state, loading: true})),
  on(listSuccess, (state, action) => ({...state, list: action.videos, loading: false})),
  on(search, state => ({...state, loading: true})),
);

export function videoReducer(state, action) {
  return video(state, action);
}
