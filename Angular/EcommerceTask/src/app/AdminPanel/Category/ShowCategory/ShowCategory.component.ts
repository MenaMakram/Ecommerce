import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Services/Category';
import { CategoryService } from 'src/app/Services/Category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ShowCategory',
  templateUrl: './ShowCategory.component.html',
  styleUrls: ['./ShowCategory.component.css']
})
export class ShowCategoryComponent implements OnInit {

  catList :Category[];
  constructor(protected catservice: CategoryService, private toastr: ToastrService,protected route:Router) { }

  ngOnInit() {
    this.catservice.getCat()
      .subscribe((data: any) => {
        if (data != null) {
          this.catList=[];
          data.forEach(element => {
             this.catList.push(element);
          });
        } else  {
          this.toastr.error(data.Errors[0]);
        }
      });
  }
  Edit(id: number, Name1: string)
  {
    this.route.navigate(['/Category'],{queryParams:{ID:id,Name:Name1}});
  }
  Delete(id: number) {
    if(id!=0)
    {
    this.catservice.delCat(id)
    .subscribe((data: any) => {
      if (data == "Successed") {
        console.log("id:"+id);
        this.ngOnInit();
        this.toastr.success('Category deleted successful');
      }
      else {
        this.toastr.error(data.Errors[0]);
      }
      }
    );
  }
  }

}
