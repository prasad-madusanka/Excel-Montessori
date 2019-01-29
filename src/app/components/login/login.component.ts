import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../../services/access/access.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isNotCorrect: boolean = false
  password: string = ''
  username: string = ''

  constructor(private accessService: AccessService, private router: Router) { }

  ngOnInit() {
  }

  signInToSystem() {


    var username = ((this.username.indexOf('@excel') == -1) || this.username == '@excel') ? '' : this.username.split('@')[0]
    this.isNotCorrect = (username == '') ? true : false

    var obj = {
      "username": username.toString().toLowerCase() || '',
      "password": this.password || ''
    }

    this.accessService.signIn(obj).subscribe((dataAccess) => {

      if (!dataAccess['status']) {
        this.createSession(dataAccess)
      }
    }, err => {
      this.isNotCorrect = true
    })
  }

  createSession(data) {
    localStorage.setItem('user', JSON.stringify({ 'username': data.username, 'name': data.name, 'role': data.role }))
    this.router.navigateByUrl('menu')
  }

  onKeydown() {
    this.signInToSystem()
  }

}
