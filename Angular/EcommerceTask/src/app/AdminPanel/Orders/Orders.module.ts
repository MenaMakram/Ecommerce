import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './Orders.component';
import { OrderDetailsModuleModule } from './OrderDetailsModule/OrderDetailsModule.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OrderDetailsModuleModule
  ],
  declarations: [OrdersComponent]
})
export class OrdersModule { }
