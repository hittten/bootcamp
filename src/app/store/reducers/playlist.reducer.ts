import {createReducer, on} from '@ngrx/store';
import {add, clear, listLoad, listSuccess, remove} from '../actions/playlist.action';
import {Video} from '../../videos/video';

export interface Playlist {
  list: Video[];
  loading: boolean;
}

export const initialState: Playlist = {
  list: [],
  loading: false,
};

const playlist = createReducer(initialState,
  on(listLoad, (state) => ({...state, loading: true})),
  on(listSuccess, (state, action) => ({...state, list: action.videos, loading: false})),
  on(add, (state, action) => ({...state, list: [...state.list, action.video]})),
  on(remove, (state, action) => {
    const index = state.list.findIndex(value => value.id === action.video.id);
    return {...state, list: state.list.filter((value, i) => i !== index)};
  }),
  on(clear, state => ({...state, list: []})),
);

export function playlistReducer(state, action) {
  return playlist(state, action);
}
