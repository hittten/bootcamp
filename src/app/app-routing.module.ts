import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './videos/list/list.component';
import {PlaylistComponent} from './videos/playlist/playlist.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DetailComponent} from './videos/detail/detail.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './auth/login/login.component';


const routes: Routes = [
  {path: '', redirectTo: '/videos', pathMatch: 'full'},
  {path: 'videos', component: ListComponent},
  {path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
