import {createReducer, on} from '@ngrx/store';
import {add, clear, remove} from '../actions/playlist.action';
import {Video} from '../videos/video';

export const initialState: Video[] = [];

const playlist = createReducer(initialState,
  on(add, (state, video) => [...state, video]),
  on(remove, (state, video) => {
    const index = state.findIndex(value => value.id === video.id);
    return state.filter((value, i) => i !== index);
  }),
  on(clear, () => []),
);

export function playlistReducer(state, action) {
  return playlist(state, action);
}
