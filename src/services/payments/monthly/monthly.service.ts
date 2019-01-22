import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MonthlyService {

  constructor(private http: HttpClient) { }

  makeSchoolPayment(payment) {
    return this.http.post(environment.SCHOOL_FEE, payment)
  }

  updateSchoolPayment(payment) {
    return this.http.put(environment.SCHOOL_FEE, payment)
  }

  deleteSchoolPayment(payment) {
    var path = environment.SCHOOL_FEE + '/remove'
    return this.http.put(path, payment)
  }

}
