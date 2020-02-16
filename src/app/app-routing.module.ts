import { FavouritesComponent } from './favourites/favourites.component';
import { CalendarComponent } from './calendar/calendar.component';
import { VenuesModule } from './venues/venues.module';
import { DealsComponent } from './deals/deals.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'venues',
    component: VenuesModule
  },
  {
    path: 'deals',
    component: DealsComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  },

  {
    path: '**',
    component: NotFoundComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
