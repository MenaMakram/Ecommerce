import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Shared/user.service';

@Component({
  selector: 'app-AdminPanel',
  templateUrl: './AdminPanel.component.html',
  styleUrls: ['./AdminPanel.component.css']
})
export class AdminPanelComponent implements OnInit {

  userClaims: any;
  constructor(private router: Router, protected userService: UserService) { }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;

    });
  }
  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRoles');
    localStorage.removeItem('cart')
    this.router.navigate(['/site']);
  }

}
