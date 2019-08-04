import { Component, OnInit } from '@angular/core';
import { VMCart } from 'src/app/Services/VMCart';
import { CategoryService } from 'src/app/Services/Category.service';
import { Category } from 'src/app/Services/Category';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Services/Product.service';
import { VCart } from 'src/app/Services/VCart';
import { OrdersService } from 'src/app/Services/Orders.service';
import { Orders } from 'src/app/Services/Orders';
import { UserService } from 'src/app/Shared/user.service';
import { OrderUserProduct } from 'src/app/Services/OrderUserProduct';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit {
  cart: VMCart[] = new Array();
  categoylist: Category[];
  prodList: VCart[] = new Array();
  billtotal = 0;
  userClaims: any;
  customer: number;
  constructor(protected prodservice: ProductService,
    protected toastr: ToastrService,
    protected Ordeservice: OrdersService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      this.customer = this.userClaims.ID;
    });
    const retrievedObject = localStorage.getItem('cart');
    const p = JSON.parse(retrievedObject);
    if (p != null) {
      p.forEach(element => {
        this.cart.push(element);
      });
      this.cart.forEach(element => {
        this.prodservice.getProdbyId(element.Productid)
          .subscribe((data: any) => {
            if (data != null) {
              const p: VCart = new VCart();
              p.product = data;
              p.Quantity = element.Quantity;
              this.prodList.push(p);
              this.calculatebill();


            } else {
              this.toastr.error(data.Errors[0]);
            }
          });
      });
    }
    this.calculatebill();

  }
  calculatebill() {
    this.billtotal = 0;
    this.prodList.forEach(el => {
      this.billtotal += el.product.Price * el.Quantity;
    });
  }
  removecart(id: number) {
    const cart1: VMCart[] = new Array();
    this.cart.forEach(element => {
      if (element.Productid !== id) {
        cart1.push(element);
      }
    });
    this.cart = cart1;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.prodList = [];

    this.cart.forEach(element => {
      this.prodservice.getProdbyId(element.Productid)
        .subscribe((data: any) => {
          if (data != null) {
            const p: VCart = new VCart();
            p.product = data;
            p.Quantity = element.Quantity;
            this.prodList.push(p);
            this.calculatebill();
          } else {
            this.prodList = [];
            this.toastr.error(data.Errors[0]);
          }
        });
    });
    this.calculatebill();
  }
  onOrder() {
    const order: Orders = new Orders();
    const today = new Date();
    let dd: string = '' + today.getDate();
    let mm: string = '' + today.getMonth() + 1; // January is 0!

    const yyyy = today.getFullYear();
    if (today.getDate() < 10) {
      dd = '0' + dd;
    }
    if (today.getMonth() < 10) {
      mm = '0' + mm;
    }
    let today1: string = dd + '-' + mm + '-' + yyyy;
    let today2: string = (dd + 3) + '-' + mm + '-' + yyyy;
    order.OrderDate = today1;
    order.DeliverDate = today2;
    order.CustomerId = this.customer;
    order.TotalOrderCash = this.billtotal;
    if (this.prodList != null && this.prodList.length > 0) {
      this.prodList.forEach(element => {
        let orderprod: OrderUserProduct = new OrderUserProduct();
        orderprod.Product_ID = element.product.ID;
        orderprod.Quantity = element.Quantity;
        order.orderUserProduct.push(orderprod);
      });

      this.Ordeservice.insertProd(order)
        .subscribe((data: any) => {
          if (data === 'Successed') {
            localStorage.removeItem('cart');
            this.toastr.success('Order Inserted successful');
            this.prodList = [];
            this.cart = [];
            this.billtotal = 0;
          } else {
            this.toastr.error(data.Errors[0]);
          }
        });
    }
  }






  addcartQ(id: number, availableQ: number) {
    this.cart.forEach(element => {
      if (element.Productid === id) {
        if (element.Quantity != availableQ)
          element.Quantity += 1;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.prodList = [];
        this.cart.forEach(element => {
          this.prodservice.getProdbyId(element.Productid)
            .subscribe((data: any) => {
              if (data != null) {
                const p: VCart = new VCart();
                p.product = data;
                p.Quantity = element.Quantity;
                this.prodList.push(p);
                this.calculatebill();
              } else {
                this.prodList = [];
                this.toastr.error(data.Errors[0]);
              }
            });
        });
        this.calculatebill();
        return;

      }


    }


    );

  }



  removecartQ(id: number) {
    this.cart.forEach(element => {
      if (element.Productid === id) {
        if (element.Quantity != 1) {
          element.Quantity -= 1;
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.prodList = [];
        this.cart.forEach(element => {
          this.prodservice.getProdbyId(element.Productid)
            .subscribe((data: any) => {
              if (data != null) {
                const p: VCart = new VCart();
                p.product = data;
                p.Quantity = element.Quantity;
                this.prodList.push(p);
                this.calculatebill();
              } else {
                this.prodList = [];
                this.toastr.error(data.Errors[0]);
              }
            });
        });
        this.calculatebill();
        return;
      }
    }
    );
  }
}
