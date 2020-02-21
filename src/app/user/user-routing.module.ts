import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';


const routes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: UserComponent
            },
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);
