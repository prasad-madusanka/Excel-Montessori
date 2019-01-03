import { Component, OnInit } from '@angular/core';
import { UserControlService } from '../../../services/admin-options/user-control.service'

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {


  dUsername: string = ''
  userId: string
  recordIndex: number

  availableUsers: any = []

  tName: string
  tUsername: string
  tPassword: string

  tResetPassword1: string
  tResetPassword2: string


  dPassword: string

  dPasswordDoesNotMatch: string = ''

  constructor(private userControlService: UserControlService) { }

  ngOnInit() {

    this.getUsers()


  }

  setCurrentRecordId(id) {
    this.userId = id
  }

  setCurrentRecordDetail(id, recIndex, uname) {
    this.userId = id
    this.recordIndex = recIndex
    this.dUsername = uname
  }

  addUser() {

    var obj = {
      "name": this.tName,
      "username": this.tUsername.split('@')[0],
      "password": this.tPassword,
      "role": this.tUsername.split('@')[1]
    }

    this.userControlService.createUser(obj).subscribe((data => {
      this.availableUsers.push(data)
    }))

  }

  viewPassword(password) {
    this.dPassword = password
  }

  resetPassword() {

    if (this.tResetPassword1 === this.tResetPassword2) {

      var obj = {
        "uid": this.userId,
        "password": this.tResetPassword1
      }

      this.userControlService.updatePassword(obj).subscribe()

    } else {
      this.dPasswordDoesNotMatch = 'Passwords does not match'
    }


  }

  getUsers() {
    this.userControlService.getUsers().subscribe((data => {
      this.availableUsers = data
    }))
  }

  deleteUser() {
    this.userControlService.deleteUser(this.userId).subscribe((data => {
      this.availableUsers.splice(this.recordIndex, 1)
    }), err => {
      if (err.status == 404) {

      }
    })
  }


}
