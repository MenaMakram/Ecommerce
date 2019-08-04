import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/Services/SubCategory';
import { SubCategoryService } from 'src/app/Services/SubCategory.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Services/Category.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/Services/Category';

@Component({
  selector: 'app-SubCategory',
  templateUrl: './SubCategory.component.html',
  styleUrls: ['./SubCategory.component.css']
})
export class SubCategoryComponent implements OnInit {
  subcat: SubCategory = new SubCategory();
  cat: Category[] = new Array();
  constructor(protected subcatservice: SubCategoryService,
              private toastr: ToastrService,
              router: ActivatedRoute,
              protected catservice: CategoryService) {
       router.queryParams.subscribe(params => {
         this.subcat.ID = params['ID'];
         this.subcat.Name = params['Name'];
         this.subcat.CategoryID = params['CategoryID'];
       });
      }

  ngOnInit() {
    this.catservice.getCat()
      .subscribe((data: any) => {
        if (data != null) {
          this.cat=[];
          data.forEach(element => {
             this.cat.push(element);
          });
        } else  {
          this.toastr.error(data.Errors[0]);
        }
      });
  }
  resetForm(form?: NgForm) {
    if (form != null) {
        form.reset();
    }
    this.subcat = {
      Name: '',
       CategoryID: 0,
      ID: 0
    };
  }
  OnSubmit(form: NgForm) {
    console.log(this.subcat.CategoryID);
    if(this.subcat.ID === 0 || this.subcat.ID === null || this.subcat.ID === undefined) {
    this.subcatservice.insertCat(form.value)
      .subscribe((data: any) => {
        if (data === 'Successed') {
          this.resetForm(form);
          this.toastr.success('Category Inserted successful');
        }  else {
          this.toastr.error(data.Errors[0]);
        }
      });
    } else {
      this.subcatservice.editCat(form.value)
      .subscribe((data: any) => {
        if (data === "Successed") {
          this.resetForm(form);
          this.toastr.success('Category update successful');
        } else {
          this.toastr.error(data.Errors[0]);
        }
      });
    }
  }
}
