import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './Products.component';
import { ShowProductModule } from './ShowProduct/ShowProduct.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShowProductModule
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
