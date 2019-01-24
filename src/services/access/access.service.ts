import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private http: HttpClient) { }

 
  signIn(obj){
    return this.http.post(environment.SIGN_IN, obj)
  }

}
