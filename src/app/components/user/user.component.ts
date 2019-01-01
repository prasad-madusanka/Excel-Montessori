import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  name_log: string = 'Prasad madusanka'
  username_log: string = 'prasadmadusanka'

  constructor() { }

  ngOnInit() {
  }

}
