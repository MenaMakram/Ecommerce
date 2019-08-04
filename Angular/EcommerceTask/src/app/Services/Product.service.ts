import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Product } from './Product';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(protected http: HttpClient) { }
insertProd(prod: Product)
  {
    const body: Product = {
      ID: prod.ID,
      Name: prod.Name,
      Image: prod.Image,
      Quantity: prod.Quantity,
      SupplierID: prod.SupplierID,
      SubCategoryID: prod.SubCategoryID,
      SupplierName: prod.SupplierName,
      Price: prod.Price,
      CategoryID: prod.CategoryID
    };
    var reqHeader = new HttpHeaders({'Auth': 'True'});
    return this.http.post(environment.API_URL+'product', body , {headers : reqHeader});
  }
  delProd(id: Number)
  {

    var reqHeader = new HttpHeaders({'Auth': 'True'});
    return this.http.delete(environment.API_URL+'product/' + id, {headers: reqHeader});
  }
  editProd(prod: Product)
  {
    const body: Product = {
      ID: prod.ID,
      Name: prod.Name,
      Image: prod.Image,
      Quantity: prod.Quantity,
      SupplierID: prod.SupplierID,
      SubCategoryID: prod.SubCategoryID,
      Price: prod.Price,
      SupplierName: prod.SupplierName,
      CategoryID: prod.CategoryID

    };
    var reqHeader = new HttpHeaders({'Auth': 'True'});
    return this.http.put(environment.API_URL+'product', body , {headers : reqHeader});
  }
  getProd(id: string)
  {
    var reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return  this.http.get(environment.API_URL + 'productall/' + id,{headers:reqHeader});
  }
  getProd1(id: number)
  {
    var reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return  this.http.get(environment.API_URL + 'productallcat/' + id,{headers:reqHeader});
  }
  getProdbyId(id: number)
  {
    var reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return  this.http.get(environment.API_URL  + 'GetAllProductbyID/' + id,{headers:reqHeader});
  }
  getProdall()
  {
    var reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return  this.http.get(environment.API_URL + 'productall/',{headers:reqHeader});
  }
  getProdall1(query:string)
  {
    var reqHeader = new HttpHeaders({'No-Auth': 'True'});
    console.log(environment.API_URL + 'productall/?'+query);
    return  this.http.get(environment.API_URL + 'productall/?'+query,{headers:reqHeader});
  }
}
