import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { OrderUserProduct } from 'src/app/Services/OrderUserProduct';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/Product.service';
import { Product } from 'src/app/Services/Product';

@Component({
  selector: 'app-OrderDetailsModule',
  templateUrl: './OrderDetailsModule.component.html',
  styleUrls: ['./OrderDetailsModule.component.css']
})
export class OrderDetailsModuleComponent implements OnInit {

  orderUserProduct: OrderUserProduct[] = new Array();
  prodname: string[];
  constructor(protected route: ActivatedRoute,protected prodservice: ProductService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {JSON.parse(data['orderUserProduct1']).forEach((element: OrderUserProduct) => {
      this.prodservice.getProdbyId(element.Product_ID).subscribe((data: Product) => {
        element.prodname = data.Name;
        this.orderUserProduct.push(element);
      });

    }); });
  }

}
