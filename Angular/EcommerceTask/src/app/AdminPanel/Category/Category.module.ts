import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './Category.component';
import { ShowCategoryModule } from './ShowCategory/ShowCategory.module';
import { AdminPanelRoutes } from '../AdminPanel.routing';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AdminPanelRoutes,
    ShowCategoryModule
  ],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
