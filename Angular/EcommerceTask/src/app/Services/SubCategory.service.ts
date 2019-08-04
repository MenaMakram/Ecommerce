import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubCategory } from './SubCategory';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  readonly rooturl = environment.API_URL;
  constructor(protected http: HttpClient) { }
  insertCat(cat: SubCategory)
    {
      const body: SubCategory = {
        ID: cat.ID,
        Name: cat.Name,
        CategoryID: cat.CategoryID
      };
      var reqHeader = new HttpHeaders({'Auth': 'True'});
      return this.http.post(this.rooturl + 'SubCategory', body , {headers : reqHeader});
    }
    delCat(id: Number)
    {

      var reqHeader = new HttpHeaders({'Auth': 'True'});
      return this.http.delete(this.rooturl + 'SubCategory/'+id);
    }
    editCat(cat: SubCategory)
    {
      const body: SubCategory = {
        ID: cat.ID,
        Name: cat.Name,
        CategoryID: cat.CategoryID
      };
      var reqHeader = new HttpHeaders({'Auth': 'True'});
      return this.http.put(this.rooturl + 'SubCategory', body , {headers : reqHeader});
    }
    getCat()
    {
      var reqHeader = new HttpHeaders({'No-Auth': 'True'});
      return  this.http.get(this.rooturl + 'SubCategoryall',{headers : reqHeader});
    }
    getsubCat(id: number)
    {
      var reqHeader = new HttpHeaders({'No-Auth': 'True'});
      return  this.http.get(this.rooturl + 'SubCategoryall/'+id,{headers : reqHeader});
    }
}
