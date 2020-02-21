
import { RouterModule, Routes } from '@angular/router';
import { CreateVenueComponent } from './create/create.component';
import { VenuesDetailsComponent } from './details/details.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { VenuesDetailsResolver } from './details/venues.resolver';
import { VenuesListComponent } from './list/list.component';


const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'venues',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: VenuesListComponent
      },
      {
        path: 'create',
        component: CreateVenueComponent,
        loadChildren: '../core/core.module#CoreModule',
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'details/:id',
        component: VenuesDetailsComponent,
        resolve: { data: VenuesDetailsResolver },
        loadChildren: '../core/core.module#CoreModule',
        ...canActivate(redirectUnauthorizedToLogin)
      },
    ]
  }
];

export const VenuesRoutingModule = RouterModule.forChild(routes);
