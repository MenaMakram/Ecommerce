import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Services/Product';
import { ProductService } from 'src/app/Services/Product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Shared/user.service';

@Component({
  selector: 'app-ShowProduct',
  templateUrl: './ShowProduct.component.html',
  styleUrls: ['./ShowProduct.component.css']
})
export class ShowProductComponent implements OnInit {

  prodList: Product[];
  userClaims: string = "";
  constructor(protected prodservice: ProductService,
              protected toastr: ToastrService,
              protected route: Router,
              protected userServices: UserService) {

   }

  ngOnInit() {

  }
  ngAfterContentInit(): void {
    this.userServices.getUserClaims().subscribe((data: any) => {
      this.userClaims = data.ID;
      this.prodservice.getProd(this.userClaims)
      .subscribe((data: any) => {
        if (data != null) {
          this.prodList = [];
          data.forEach(element => {
             this.prodList.push(element);
          });
        } else  {
          this.toastr.error(data.Errors[0]);
        }
      });

    });

  }
  showprod(query: string)
  {
    this.userServices.getUserClaims().subscribe((data: any) => {
      this.userClaims = data.ID;
      this.prodservice.getProdall1(query)
      .subscribe((data: any) => {
        if (data != null) {
          this.prodList = [];
          data.forEach(element => {
             this.prodList.push(element);
          });
        } else  {
          this.toastr.error(data.Errors[0]);
        }
      });

    });
  }
  Edit(id: number)
  {
    this.prodList.forEach(element => {
      if(element.ID === id)
      {
    this.route.navigate(['/Product'],{queryParams:{
      ID: element.ID
      , Name: element.Name
      , Price: element.Price
      , Quantity: element.Quantity
      , Image: element.Image
      , SubCategoryID: element.SubCategoryID
      , SupplierID: element.SupplierID
      , CategoryID: element.CategoryID}});
    console.log('ss' + element.SubCategoryID);
      }
    });
  }
  Delete(id: number) {
    if(id!=0)
    {
    this.prodservice.delProd(id)
    .subscribe((data: any) => {
      if (data === 'Successed') {
        console.log("id:"+id);
        this.ngAfterContentInit();
        this.toastr.success('Product deleted successful');
      }
      else
        this.toastr.error(data.Errors[0]);
      }
    );
  }
  }
}
