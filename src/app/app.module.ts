import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListComponent} from './videos/list/list.component';
import {PlaylistComponent} from './videos/playlist/playlist.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FormsModule} from '@angular/forms';
import {VideoComponent} from './videos/video/video.component';
import {HighlightDirective} from './highlight.directive';
import {TimePipe} from './time.pipe';
import {DetailComponent} from './videos/detail/detail.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './auth/login/login.component';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {PlaylistEffects} from './effects/playlist.effects';
import {UserEffects} from './effects/user.effects';
import {VideoEffects} from './effects/video.effects';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PlaylistComponent,
    PageNotFoundComponent,
    VideoComponent,
    HighlightDirective,
    TimePipe,
    DetailComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([UserEffects, VideoEffects, PlaylistEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
