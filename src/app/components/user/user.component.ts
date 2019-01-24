import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  name_log: string = 'Prasad madusanka'
  username_log: string = 'prasadmadusanka'

  constructor(private router: Router) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'))
    this.name_log = user.name || ''
    this.username_log = user.username + '@excel' || ''
  }

  signOut(){
    localStorage.clear()
    this.router.navigateByUrl('sign-in')
  }

}
