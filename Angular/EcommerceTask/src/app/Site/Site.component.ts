import { Product } from './../Services/Product';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../Services/Category.service';
import { ProductService } from '../Services/Product.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../Services/Category';
import { VMCart } from '../Services/VMCart';
import { Router } from '@angular/router';
import { UserService } from '../Shared/user.service';
import { SubCategory } from '../Services/SubCategory';
import { SubCategoryService } from '../Services/SubCategory.service';

@Component({
  selector: 'app-Site',
  templateUrl: './Site.component.html',
  styleUrls: ['./Site.component.css']
})
export class SiteComponent implements OnInit {
  prodlist: Product[] = new Array();
  categoylist: Category[] = new Array();
  subcategorylist: SubCategory[] = new Array();
  cart: VMCart[] = new Array();
  role: any;
  constructor(protected productservice: ProductService,
              protected categoryservice: CategoryService,
              protected subcategoryservice: SubCategoryService,
              protected toastr: ToastrService,
              protected usrservice: UserService,
              protected router: Router) { }

  ngOnInit() {
    let retrievedObject = localStorage.getItem('cart');
    let p = JSON.parse(retrievedObject);
    let retrievedObject1 = localStorage.getItem('userRoles');
    let p1 = JSON.parse(retrievedObject1);

if(p1!=null)
{
  this.role = p1[0];

}
    if (p != null) {

      p.forEach(element => {
        this.cart.push(element);
      });
    }
    this.getAllProduct('pageNumber=1&pageSize=10');
    this.getAllCategory();
  }
  getproductcat(id: number) {
    this.productservice.getProd1(id).subscribe(
      (data: Product[]) => {
        this.prodlist = data;
      }
    );
  }
  getsubcategory(id: number)
  {
    this.subcategoryservice.getsubCat(id)
      .subscribe((data: any) => {
        if (data != null || data == "Successed") {
          this.subcategorylist = [];
          data.forEach(element => {

            this.subcategorylist.push(element);
          });
        } else {
          this.toastr.error(data.Errors[0]);
        }
      });
  }
  getAllCategory()
  {
    this.categoryservice.getCat().subscribe((data: any) => {
      if (data != null) {
        this.categoylist = [];
        data.forEach(element => {
          this.categoylist.push(element);
        });
      } else {
        this.toastr.error(data.Errors[0]);
      }
    });
  }
  getAllProduct(query: string)
  {
    this.productservice.getProdall1(query).subscribe((data: any) => {
      if (data != null) {
        this.prodlist = [];
        data.forEach(element => {
          console.log(element.SupplierName)
          this.prodlist.push(element);
        });
      } else {
        this.toastr.error(data.Errors[0]);
      }
    });
  }
  addtocart(id: number, quantity: number) {
    if (this.cart === undefined || this.cart.length === 0) {

      const vm: VMCart = new VMCart();
      vm.Productid = id;
      vm.Quantity = quantity;
      this.cart.push(vm);

      localStorage.setItem('cart', JSON.stringify(this.cart));

    } else {
      let f: Boolean = false;
      this.cart.forEach(element => {
        if (element.Productid === id) {
          element.Quantity += quantity;
          localStorage.setItem('cart', JSON.stringify(this.cart));
          f = true;
          return;

        }


      }


      );
      if (!f) {
        const vm1: VMCart = new VMCart();
        vm1.Productid = id;
        vm1.Quantity = quantity;
        this.cart.push(vm1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
  }
  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRoles');
    localStorage.removeItem('cart');
    this.router.navigate(['/login']);
  }
  Login()
  {
    this.router.navigate(['/login']);
  }
}
