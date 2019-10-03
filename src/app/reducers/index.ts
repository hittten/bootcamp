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
import * as fromRouter from '@ngrx/router-store';

export interface State {
  router: fromRouter.RouterReducerState<any>;
  user: User | null;
  videos: VideoList;
  playlist: Playlist;
  error: ErrorMessage;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  user: userReducer,
  videos: videoReducer,
  playlist: playlistReducer,
  error: errorMessageReducer,
};

export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState<any>>('router');
const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectRouteId = selectRouteParam('id');
export const selectStatus = selectQueryParam('status');

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
export const selectVideoDetail = createSelector(
  selectVideos,
  (videos) => videos.detail,
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
