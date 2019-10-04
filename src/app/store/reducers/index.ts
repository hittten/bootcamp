import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {Playlist, playlistReducer} from './playlist.reducer';
import {User, userReducer} from './user.reducer';
import {VideoList, videoReducer} from './video.reducer';
import * as fromRouter from '@ngrx/router-store';
import {environment} from '../../../environments/environment';

export interface State {
  router: fromRouter.RouterReducerState<any>;
  user: User | null;
  videos: VideoList;
  playlist: Playlist;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  user: userReducer,
  videos: videoReducer,
  playlist: playlistReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
