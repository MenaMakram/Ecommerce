import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { AdminPanelModule } from './AdminPanel/AdminPanel.module';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './Shared/user.service';
import { ForbidenComponent } from './Forbiden/Forbiden.component';
import { SiteModule } from './Site/site.module';

@NgModule({
  declarations: [
    AppComponent,
    ForbidenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AdminPanelModule,
    SiteModule,
    FormsModule
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
  bootstrap: [AppComponent]
})
export class AppModule { }
