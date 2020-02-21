import { EventsDetailsResolver } from './details/details.resolver';
import { EventsListComponent } from './../events/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create/create.component';
import { EventsDetailsComponent } from './details/details.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'events',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventsListComponent
      },
      {
        path: 'create',
        component: CreateEventComponent,
        loadChildren: '../core/core.module#CoreModule',
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'details/:id',
        component: EventsDetailsComponent,
        resolve: { data: EventsDetailsResolver },
        loadChildren: '../core/core.module#CoreModule',
        ...canActivate(redirectUnauthorizedToLogin)
      },
    ]
  }
];

export const EventsRoutingModule = RouterModule.forChild(routes);
