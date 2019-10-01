import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {Video} from '../videos/video';
import {playlistReducer} from './playlist.reducer';

export interface State {
  playlist: Video[];
}

export const reducers: ActionReducerMap<State> = {
  playlist: playlistReducer,
};

export const selectPlaylist = createFeatureSelector<State, Video[]>('playlist');

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
