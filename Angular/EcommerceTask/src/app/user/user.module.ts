import { AdminPanelRoutes } from './../AdminPanel/AdminPanel.routing';

import { UserService } from '../Shared/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from '../user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes.routing';
import { AuthGuard } from '../auth/auth.guard';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { SignUpModule } from './sign-up/sign-up.module';
import { SignInModule } from './sign-in/sign-in.module';

@NgModule({
   declarations: [
      UserComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      SignUpModule,
      SignInModule
   ],
   providers: [
      UserService,
      AuthGuard,
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

export class UserModule { }
