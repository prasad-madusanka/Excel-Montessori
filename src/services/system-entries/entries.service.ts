import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

interface nonPaymentEntriesPost {
  _id: string
  entryName: string
  entryYear: number
}

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  constructor(private http: HttpClient) { }

  addNonPaymentEntry(reqBody) {
    return this.http.post<nonPaymentEntriesPost>(environment.SE_NON_PAYMENT, reqBody)
  }

  updateNonPaymentEntry(reqBody) {
    return this.http.put(environment.SE_NON_PAYMENT, reqBody)
  }

  getNonPaymentEntries() {
    return this.http.get(environment.SE_NON_PAYMENT)
  }

  deleteNonPaymentEntry(_id) {
    var path = '/' + _id
    return this.http.delete(environment.SE_NON_PAYMENT + path)
  }

  addPaymentEntry(reqBody) {
    return this.http.post(environment.SE_PAYMENT, reqBody)
  }

  updatePaymentEntry(reqBody) {
    return this.http.put(environment.SE_PAYMENT, reqBody)
  }

  getPaymentEntries() {
    return this.http.get(environment.SE_PAYMENT)
  }

  deletePaymentEntry(_id) {
    var path = '/' + _id
    return this.http.delete(environment.SE_PAYMENT + path)
  }

}
