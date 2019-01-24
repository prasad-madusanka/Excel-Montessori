import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  role: string = ''

  constructor(private router: Router) { }

  ngOnInit() {

    if (localStorage.length == 0) {
      this.router.navigateByUrl('sign-in')
    }else{
      this.role = JSON.parse(localStorage.getItem('user')).role
    }

  }

  loadChild(url) {
    this.router.navigateByUrl('menu' + url)
  }

}
