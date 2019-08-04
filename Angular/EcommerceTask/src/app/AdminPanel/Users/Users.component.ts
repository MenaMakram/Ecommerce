import { Users } from 'src/app/Shared/Users';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Users',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css']
})
export class UsersComponent implements OnInit {

  usrList: Users[];
  constructor(protected userservice: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userservice.getUsers()
      .subscribe((data: any) => {
        if (data != null) {
          this.usrList=[];
          data.forEach(element => {
             this.usrList.push(element);
          });
        } else  {
          this.toastr.error(data.Errors[0]);
        }
      });
  }
  Delete(id: string) {
    if (id !== '' || id != null)
    {
    this.userservice.delUsers(id)
    .subscribe((data: any) => {
      if (data == "Successed") {
        this.ngOnInit();
        this.toastr.success('User deleted successful');
      }
      else {
        this.toastr.error(data.Errors[0]);
      }
      }
    );
  }
  }

}
