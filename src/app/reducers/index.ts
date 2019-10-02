import {
  ActionReducerMap,
  createFeatureSelector, createSelector,
  MetaReducer,
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {Playlist, playlistReducer} from './playlist.reducer';
import {ErrorMessage, errorMessageReducer} from './error-message.reducer';
import {User, userReducer} from './user.reducer';

export interface State {
  user: User | null;
  playlist: Playlist;
  error: ErrorMessage;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  playlist: playlistReducer,
  error: errorMessageReducer,
};

export const selectUser = createFeatureSelector<State, User>('user');
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
