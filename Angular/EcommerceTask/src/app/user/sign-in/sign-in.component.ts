import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit() {
  }
  OnSubmit(userName,password){
    this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
     localStorage.setItem('userRoles',data.role);

     if(data.role === '["Customer"]') {
     this.router.navigate(['/site']);
     }
     else {
     this.router.navigate(['/AdminPanel']);
     }

   },
   (err : HttpErrorResponse)=>{
     this.isLoginError = true;
   });
 }

}
