import { NgModule } from '@angular/core';

import { SignUpComponent } from './sign-up.component';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';

import { appRoutes } from 'src/app/routes.routing';

import { UserService } from 'src/app/Shared/user.service';

import { AuthGuard } from 'src/app/auth/auth.guard';

import { AuthInterceptor } from 'src/app/auth/auth.interceptor';

import { AppComponent } from 'src/app/app.component';

@NgModule({
  declarations: [
     SignUpComponent,
  ],
  imports: [
     BrowserModule,
     AppRoutingModule,
     FormsModule,
     HttpClientModule,
     ToastrModule.forRoot(),
     BrowserAnimationsModule,
     RouterModule.forRoot(appRoutes)
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

export class SignUpModule {
}
