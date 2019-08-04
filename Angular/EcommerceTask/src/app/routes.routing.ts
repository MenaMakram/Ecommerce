// import { ProductsComponent } from './Products/Products.component';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
// import { HomeComponent } from './Home/Home.component';
// import { CategoryComponent } from './Category/Category.component';
// import { ShowCaegoryComponent } from './Category/showCaegory/showCaegory.component';
// import { ShowProductComponent } from './Products/showProduct/showProduct.component';
// import { ForbidenComponent } from './Forbiden/Forbiden.component';
// import { SiteComponent } from './Site/Site.component';
// import { CartComponent } from './Site/Cart/Cart.component';

export const appRoutes: Routes = [
  {
      path: 'signup', component: UserComponent,
      children: [{ path: '', component: SignUpComponent }]
  },
  {
      path: 'login', component: UserComponent,
      children: [{ path: '', component: SignInComponent }]
  }
  ,
  //   { path: 'forbidden', component: ForbidenComponent, canActivate: [AuthGuard] },
  // { path: 'site', component: SiteComponent  /*, canActivate: [AuthGuard], data: { roles: ['Admin' , 'Supplier' , 'Customer']}*/ },
  //   { path: 'cart', component: CartComponent , canActivate: [AuthGuard], data: { roles: ['Customer']}},
  { path : '', redirectTo: '/site', pathMatch : 'full'}

];
