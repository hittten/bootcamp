import {
  ActionReducerMap,
  createFeatureSelector, createSelector,
  MetaReducer,
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {Playlist, playlistReducer} from './playlist.reducer';
import {ErrorMessage, errorMessageReducer} from './error-message.reducer';
import {User, userReducer} from './user.reducer';
import {VideoList, videoReducer} from './video.reducer';

export interface State {
  user: User | null;
  videos: VideoList;
  playlist: Playlist;
  error: ErrorMessage;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  videos: videoReducer,
  playlist: playlistReducer,
  error: errorMessageReducer,
};

export const selectUser = createFeatureSelector<State, User>('user');
const selectVideos = createFeatureSelector<State, VideoList>('videos');
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

export const selectVideoList = createSelector(
  selectVideos,
  (videos) => videos.list,
);
export const selectVideoLoading = createSelector(
  selectVideos,
  (videos) => videos.loading,
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
