import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryComponent } from './SubCategory.component';
import { ShowSubCategoryModule } from './ShowSubCategory/ShowSubCategory.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ShowSubCategoryModule,
    FormsModule
  ],
  declarations: [SubCategoryComponent]
})
export class SubCategoryModule { }
