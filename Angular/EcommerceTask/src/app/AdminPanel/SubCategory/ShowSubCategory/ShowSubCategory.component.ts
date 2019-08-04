import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/Services/SubCategory';
import { SubCategoryService } from 'src/app/Services/SubCategory.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ShowSubCategory',
  templateUrl: './ShowSubCategory.component.html',
  styleUrls: ['./ShowSubCategory.component.css']
})
export class ShowSubCategoryComponent implements OnInit {

  catList :SubCategory[];
  constructor(protected catservice: SubCategoryService, private toastr: ToastrService,protected route:Router) { }

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
    this.route.navigate(['/SubCategory'],{queryParams:{ID:id,Name:Name1}});
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
