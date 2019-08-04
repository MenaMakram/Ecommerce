import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Orders } from './Orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  readonly rooturl = environment.API_URL;
constructor(protected http: HttpClient) { }
insertProd(prod: Orders)
  {
    const body: Orders = {
      CustomerId: prod.CustomerId,
      DeliverDate: prod.DeliverDate,
      TotalOrderCash: prod.TotalOrderCash,
      OrderDate: prod.OrderDate,
      orderUserProduct: prod.orderUserProduct,
      ID: prod.ID
    };
    var reqHeader = new HttpHeaders({'Auth': 'True'});
    return this.http.post(this.rooturl + 'orders/', body , {headers : reqHeader});
  }
  getallorders()
  {
    var reqHeader = new HttpHeaders({'Auth': 'True'});
    return  this.http.get(environment.API_URL + 'orders/',{headers:reqHeader});
  }
}
