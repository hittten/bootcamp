import {
  ActionReducerMap,
  createFeatureSelector, createSelector,
  MetaReducer,
} from '@ngrx/store';
import {Playlist, playlistReducer} from './playlist.reducer';
import {ErrorMessage, errorMessageReducer} from './error-message.reducer';
import {User, userReducer} from './user.reducer';
import {VideoList, videoReducer} from './video.reducer';
import * as fromRouter from '@ngrx/router-store';
import {environment} from '../../../environments/environment';

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

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
