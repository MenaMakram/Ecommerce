import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Forbiden',
  templateUrl: './Forbiden.component.html',
  styleUrls: ['./Forbiden.component.css']
})
export class ForbidenComponent implements OnInit {

  constructor(protected router: Router) { }

  ngOnInit() {
  }
  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRoles');
    localStorage.removeItem('cart')
    this.router.navigate(['/site']);
  }

}
