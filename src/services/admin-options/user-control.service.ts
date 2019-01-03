import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

interface userPost {
  name: string,
  username: string,
  password: string,
  _id: string
}

@Injectable({
  providedIn: 'root'
})
export class UserControlService {

  constructor(private http: HttpClient) { }

  createUser(reqBody) {
    return this.http.post<userPost>(environment.ADMIN_OPTIONS, reqBody)
  }

  updatePassword(reqBody) {
    return this.http.put(environment.ADMIN_OPTIONS, reqBody)
  }

  deleteUser(_id) {
    var path = '/' + _id
    return this.http.delete(environment.ADMIN_OPTIONS + path)
  }

  getUsers() {
    return this.http.get(environment.ADMIN_OPTIONS)
  }

}
