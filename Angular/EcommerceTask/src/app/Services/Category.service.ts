import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Category } from './Category';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly rooturl = environment.API_URL;
constructor(protected http: HttpClient) { }
insertCat(cat: Category)
  {
    const body: Category = {
      ID: cat.ID,
      Name: cat.Name,
    };
    var reqHeader = new HttpHeaders({'Auth': 'True'});
    return this.http.post(this.rooturl + 'Category', body , {headers : reqHeader});
  }
  delCat(id: Number)
  {

    var reqHeader = new HttpHeaders({'Auth': 'True'});
    return this.http.delete(this.rooturl + 'Category/'+id);
  }
  editCat(cat: Category)
  {
    const body: Category = {
      ID: cat.ID,
      Name: cat.Name,
    };
    var reqHeader = new HttpHeaders({'Auth': 'True'});
    return this.http.put(this.rooturl + 'Category', body , {headers : reqHeader});
  }
  getCat()
  {
    var reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return  this.http.get(this.rooturl + 'Categoryall',{headers : reqHeader});
  }
}
