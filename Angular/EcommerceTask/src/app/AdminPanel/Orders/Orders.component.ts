import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/Services/Orders';
import { OrdersService } from 'src/app/Services/Orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderUserProduct } from 'src/app/Services/OrderUserProduct';

@Component({
  selector: 'app-Orders',
  templateUrl: './Orders.component.html',
  styleUrls: ['./Orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList: Orders[];
  constructor(protected orderservice: OrdersService, private toastr: ToastrService,protected route:Router) { }

  ngOnInit() {
    this.orderservice.getallorders()
      .subscribe((data: any) => {
        if (data != null) {
          this.orderList = [];
          data.forEach(element => {
             this.orderList.push(element);
          });
        } else  {
          this.toastr.error(data.Errors[0]);
        }
      });
  }
  Details(orderUserProduct:OrderUserProduct[])
  {
    this.route.navigate(['/showOrdersDetails'], {queryParams: {orderUserProduct1: JSON.stringify(orderUserProduct)}});
  }

}
