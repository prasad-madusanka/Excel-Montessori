import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.length == 0) {
      this.router.navigateByUrl('sign-in')
    } else {
      this.router.navigateByUrl('menu')
    }
  }

  title = 'Excel';
}
