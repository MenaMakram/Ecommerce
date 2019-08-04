import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './Users';

@Injectable()
export class UserService {
  readonly rooturl = environment.API_URL;
  constructor(protected http: HttpClient) { }
  registerUser(user: Users, roles: string[]) {
    const body: Users = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      ID: user.ID,
      Roles: roles,
      City: user.City,
      Country: user.Country,
      PhoneNumber: user.PhoneNumber
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rooturl + 'User/Register', body, { headers: reqHeader });
  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post('http://localhost:57014/token', data, { headers: reqHeader });
  }
  getUserClaims() {
    var reqHeader = new HttpHeaders({'Auth': 'True'});
    return this.http.get(this.rooturl + 'GetUserClaims',{headers:reqHeader});
  }
  getAllRoles() {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rooturl + 'GetAllRoles', { headers: reqHeader });
  }
  getUsername(id: string) {
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rooturl + 'GetUser/' + id, { headers: reqHeader });
  }
  getUsers()
  {
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rooturl + 'GetAllCustomers/' , { headers: reqHeader });
  }
  delUsers(id: string)
  {
    const reqHeader = new HttpHeaders({ 'Auth': 'True' });
    return this.http.delete(this.rooturl + 'user/' + id , { headers: reqHeader });
  }
}
