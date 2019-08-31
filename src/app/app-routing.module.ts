import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './videos/list/list.component';
import {PlaylistComponent} from './videos/playlist/playlist.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', redirectTo: '/videos', pathMatch: 'full'},
  {path: 'videos', component: ListComponent},
  {path: 'playlist', component: PlaylistComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
