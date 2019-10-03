import {createReducer, on} from '@ngrx/store';
import {getVideo, getVideoSuccess, listLoad, listSuccess, search} from '../actions/video.actions';
import {Video} from '../../videos/video';

export interface VideoList {
  list: Video[];
  loading: boolean;
  detail: Video;
}

export const initialState: VideoList = {
  list: [],
  loading: false,
  detail: null,
};

const video = createReducer(initialState,
  on(listLoad, (state) => ({...state, loading: true})),
  on(listSuccess, (state, action) => ({...state, list: action.videos, loading: false})),
  on(search, state => ({...state, loading: true})),
  on(getVideo, state => ({...state, loading: true})),
  on(getVideoSuccess, (state, action) => ({...state, loading: false, detail: action.video})),
);

export function videoReducer(state, action) {
  return video(state, action);
}
