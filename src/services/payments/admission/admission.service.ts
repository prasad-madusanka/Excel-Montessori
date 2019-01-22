import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

interface pullInstallment {
  "deletedStatus": {},
  "admissionCurrent": {}
}

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private http: HttpClient) { }

  makeAdmissionPayment(installment) {
    var path = environment.ADMISSION + '/make-payment'
    return this.http.put(path, installment)
  }

  pullInstallment(installment) {
    return this.http.put<pullInstallment>(environment.ADMISSION, installment)
  }

  updateInstallment(installment) {
    var path = environment.ADMISSION + '/modify-payment'
    return this.http.put(path, installment)
  }

}
