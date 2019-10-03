import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {User} from '../reducers/user.reducer';
import {VideoList} from '../reducers/video.reducer';
import {Playlist} from '../reducers/playlist.reducer';
import {ErrorMessage} from '../reducers/error-message.reducer';
import {State} from '../reducers';


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
