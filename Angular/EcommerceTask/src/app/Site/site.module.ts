import { UserService } from './../Shared/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from '../Services/Category.service';
import { ProductService } from '../Services/Product.service';
import { AuthGuard } from '../auth/auth.guard';
import { OrdersService } from '../Services/Orders.service';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AppComponent } from '../app.component';
import { SiteComponent } from './Site.component';
import { CartComponent } from './Cart/Cart.component';
import { RouterModule } from '@angular/router';


@NgModule({
   declarations: [
      SiteComponent,
      CartComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      RouterModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      BrowserAnimationsModule,
   ],
   providers: [
      UserService,
      CategoryService,
      ProductService,
      AuthGuard,
      OrdersService,
      UserService,
      {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})

export class SiteModule { }
