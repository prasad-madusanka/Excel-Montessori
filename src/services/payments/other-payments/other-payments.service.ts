import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtherPaymentsService {

  constructor(private http: HttpClient) { }

  getOtherPayment() {
    return this.http.get(environment.SE_PAYMENT)
  }

  makeOtherPayment(payment) {
    return this.http.post(environment.OTHER_PAYMENTS, payment)
  }

  updateOtherPayment(payment) {
    return this.http.put(environment.OTHER_PAYMENTS, payment)
  }

  deletePayment(payment) {
    var path = environment.OTHER_PAYMENTS + '/remove'
    return this.http.put(path, payment)
  }

}
