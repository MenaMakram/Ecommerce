import { AdminPanelComponent } from './../AdminPanel/AdminPanel.component';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from '../auth/auth.guard';

const userroutes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
},
{
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
},
{ path: 'AdminPanel', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin','Supplier']}},


];

export const UserRouteRoutes = RouterModule.forChild(userroutes);
