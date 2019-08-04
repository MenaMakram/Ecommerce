import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from '../AdminPanel/Category/Category.component';
import { AuthGuard } from '../auth/auth.guard';
import { ProductsComponent } from '../AdminPanel/Products/Products.component';
import { ShowCategoryComponent } from '../AdminPanel/Category/ShowCategory/ShowCategory.component';
import { ShowProductComponent } from '../AdminPanel/Products/ShowProduct/ShowProduct.component';
import { AdminPanelComponent } from '../AdminPanel/AdminPanel.component';
import { ShowSubCategoryComponent } from './SubCategory/ShowSubCategory/ShowSubCategory.component';
import { SubCategoryComponent } from './SubCategory/SubCategory.component';
import { UsersComponent } from './Users/Users.component';
import { OrdersComponent } from './Orders/Orders.component';
import { OrderDetailsModuleComponent } from './Orders/OrderDetailsModule/OrderDetailsModule.component';


const routes: Routes = [
  { path: 'AdminPanel', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin','Supplier']}},
  {
    path: 'Category', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin']},
    children: [{ path: '', component: CategoryComponent }]
  },
  {
    path: 'showCategory', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin']},
    children: [{ path: '', component: ShowCategoryComponent }]
  },
  {
    path: 'SubCategory', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin']},
    children: [{ path: '', component: SubCategoryComponent }]
  },
  {
    path: 'ShowSubCategory', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin']},
    children: [{ path: '', component: ShowSubCategoryComponent }]
  },
  {
    path: 'Product', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin','Supplier']},
    children: [{ path: '', component: ProductsComponent }]
  },
  {
    path: 'showProduct', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin','Supplier']},
    children: [{ path: '', component: ShowProductComponent }]
  },
  {
    path: 'showUsers', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin']},
    children: [{ path: '', component: UsersComponent }]
  },
  {
    path: 'showOrders', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin']},
    children: [{ path: '', component: OrdersComponent }]
  },
  {
    path: 'showOrdersDetails', component: AdminPanelComponent, canActivate: [AuthGuard],data: { roles: ['Admin']},
    children: [{ path: '', component: OrderDetailsModuleComponent }]
  },
];

export const AdminPanelRoutes = RouterModule.forChild(routes);
