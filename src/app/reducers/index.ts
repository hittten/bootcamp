import {
  ActionReducerMap,
  createFeatureSelector, createSelector,
  MetaReducer,
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {Playlist, playlistReducer} from './playlist.reducer';
import {ErrorMessage, errorMessageReducer} from './error-message.reducer';

export interface State {
  playlist: Playlist;
  error: ErrorMessage;
}

export const reducers: ActionReducerMap<State> = {
  playlist: playlistReducer,
  error: errorMessageReducer,
};

const selectPlaylist = createFeatureSelector<State, Playlist>('playlist');
export const selectError = createFeatureSelector<State, ErrorMessage>('error');

export const selectPlaylistList = createSelector(
  selectPlaylist,
  (playlist) => playlist.list,
);
export const selectPlaylistLoading = createSelector(
  selectPlaylist,
  (playlist) => playlist.loading,
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
