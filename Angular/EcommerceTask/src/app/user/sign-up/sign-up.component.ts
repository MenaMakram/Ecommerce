import { UserService } from './../../Shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/Shared/Users';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  user: Users;
  emailPattern = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$';
  roles: any[];
  constructor(protected userservice: UserService, private toastr: ToastrService) {  }

  ngOnInit() {
    this.resetForm();
    this.roles = ['Customer'];
  }
  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: '',
      ID: '',
      City: '',
      Country: '',
      PhoneNumber: '',
      Roles: ['Customer']
    };

  }
  OnSubmit(form: NgForm) {
    var x = this.roles = ['Customer'];
    this.userservice.registerUser(form.value,x)
      .subscribe((data: any) => {
        if (data.Succeeded === true) {
          this.resetForm(form);
          this.toastr.success('User registration successful');
        } else {
          this.toastr.error(data.Errors[0]);
        }
      });
  }
}
