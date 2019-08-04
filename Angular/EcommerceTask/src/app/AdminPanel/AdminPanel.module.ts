import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './AdminPanel.component';
import { UserModule } from '../user/user.module';
import { ProductsModule } from './Products/Products.module';
import { CategoryModule } from './Category/Category.module';
import { SubCategoryModule } from './SubCategory/SubCategory.module';
import { AdminPanelRoutes } from './AdminPanel.routing';
import { UserService } from '../Shared/user.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UsersModule } from './Users/Users.module';
import { OrdersModule } from './Orders/Orders.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
      FormsModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      BrowserAnimationsModule,
    CategoryModule,
    ProductsModule,
    SubCategoryModule,
    UserModule,
    UsersModule,
    OrdersModule,
    AdminPanelRoutes
  ],
  providers: [UserService,

    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],
  declarations: [AdminPanelComponent]
})
export class AdminPanelModule { }
