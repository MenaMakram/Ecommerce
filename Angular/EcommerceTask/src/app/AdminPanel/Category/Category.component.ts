import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/Category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/Services/Category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-Category',
  templateUrl: './Category.component.html',
  styleUrls: ['./Category.component.css']
})
export class CategoryComponent implements OnInit {
  cat: Category=new Category();
  constructor(protected catservice: CategoryService, private toastr: ToastrService,router: ActivatedRoute) {
       router.queryParams.subscribe(params => {
         this.cat.ID=params['ID'];
         this.cat.Name=params['Name'];
       });
      }

  ngOnInit() {
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.cat = {
      Name: '',
      ID: 0
    }
  }
  OnSubmit(form: NgForm) {
    if(this.cat.ID==0||this.cat.ID==null)
    {
    this.catservice.insertCat(form.value)
      .subscribe((data: any) => {
        if (data == "Successed") {
          this.resetForm(form);

          this.toastr.success('Category Inserted successful');
        }
        else
          this.toastr.error(data.Errors[0]);
      });
    }
    else
    {
      this.catservice.editCat(form.value)
      .subscribe((data: any) => {
        if (data == "Successed") {
          this.resetForm(form);
          this.toastr.success('Category update successful');
        }
        else
          this.toastr.error(data.Errors[0]);
      });
    }
  }
}
