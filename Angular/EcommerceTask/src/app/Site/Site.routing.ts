import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SiteComponent } from './Site.component';
import { CartComponent } from './Cart/Cart.component';

const routes: Routes = [
  { path: 'site', component: SiteComponent },
  { path: 'cart', component: CartComponent , canActivate: [AuthGuard], data: { roles: ['Customer']}},
];

export const SiteRoutes = RouterModule.forChild(routes);
