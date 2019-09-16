import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListComponent} from './videos/list/list.component';
import {PlaylistComponent} from './videos/playlist/playlist.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FormsModule} from '@angular/forms';
import {VideoComponent} from './videos/video/video.component';
import { HighlightDirective } from './highlight.directive';
import { TimePipe } from './time.pipe';
import { DetailComponent } from './videos/detail/detail.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
