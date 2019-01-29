import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getAdmissionReport(status) {

    var path = environment.REPORTS + "admission/" + status
    return this.http.get(path)

  }

  getMonthlyPaymentReport(obj) {
    var path = environment.REPORTS + "monthly-payments"
    return this.http.post(path, obj)
  }

}
