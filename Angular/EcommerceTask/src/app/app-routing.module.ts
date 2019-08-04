import { SiteRoutes } from './Site/Site.routing';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRouteRoutes } from './user/user-route.routing';
import { AdminPanelRoutes } from './AdminPanel/AdminPanel.routing';
import { ForbidenComponent } from './Forbiden/Forbiden.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{ path: 'forbidden', component: ForbidenComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes),UserRouteRoutes,AdminPanelRoutes,SiteRoutes],
  exports: [RouterModule]
})
export class AppRoutingModule { }
