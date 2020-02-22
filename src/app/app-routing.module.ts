import { UserComponent } from './user/user.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { VenuesModule } from './venues/venues.module';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
  },
  {
    path: 'venues',
    pathMatch: 'full',
    component: VenuesModule
  },
  {
    path: 'favourites',
    pathMatch: 'full',
    component: FavouritesComponent,
    loadChildren: './core/core.module#CoreModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'user',
    pathMatch: 'full',
    component: UserComponent,
    loadChildren: './core/core.module#CoreModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
