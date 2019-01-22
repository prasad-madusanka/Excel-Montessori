import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { EntriesService } from '../../../../services/system-entries/entries.service'
import { StudentService } from '../../../../services/students/student.service'
import { AdmissionService } from '../../../../services/payments/admission/admission.service'
import { MonthlyService } from '../../../../services/payments/monthly/monthly.service'
import { OtherPaymentsService } from '../../../../services/payments/other-payments/other-payments.service'

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakePaymentComponent implements OnInit {

  @Input() userData: any
  @Output() refreshAdmissionData = new EventEmitter<object>()
  @Output() refreshMonthSchoolFeeData = new EventEmitter<object>()
  @Output() refreshOtherPaymentsData = new EventEmitter<object>()

  isAdmissionPayButtonDisable: boolean = true
  isAdmissionUpdateButtonDisable: boolean = true
  isSchoolMonthPayButtonDisable: boolean = true
  isSchoolMonthUpdateButtonDisable: boolean = true
  isOtherPaymentButtonDisable: boolean = true
  isOtherPaymentUpdateButtonDisable: boolean = true
  isDCPayButtonDisable: boolean = true
  officeClassAvailability: string = '- No class found -'
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  admissionPaymentReciept: number
  admissionPaymentAmount1: number
  admissionPaymentAmount2: number

  updateAdmissionPaymentAmount1: number
  updateAdmissionPaymentAmount2: number
  updateAdmissionPaymentReciept: number

  //set variables
  admissionId: string = ''
  admissionInstallmentRecordID: string = ''
  admissionInstallmentReciept: number = 0

  //monthyl

  dcMonthlyPaymentStatusName: string = ''

  paymentMonth: string = ''
  monthlySchoolFeeReciept: number

  //montly payment daycare
  dcPaymentCategories: any
  dcPayementMonth: string = ''
  txtDCPayementReciept: number
  dcAmount: number = 0

  updatePaymentMonth: string = ''
  updateSchoolFeeReciept: number

  studentId: string = ''

  updateMonthlyFeeAmount: number
  monthlySchoolPaymentRecordID: string = ''

  otherPaymentRecordId: string = ''
  validateOtherPaymentPaidFor: string = ''
  otherPaymentPaidFor: string = ''
  otherPaymentReciept: number
  otherPaymentAmount: number

  //other payemnt update
  updateOtherPaymentReciept: number
  otherPaymentID: string = ''
  //otherPaymentRecordID: string = ''
  otherPaymentPaidForID: string = ''
  otherPaymentMount: number

  constructor(private studentService: StudentService, private entriesService: EntriesService,
    private admissionService: AdmissionService, private monthlyService: MonthlyService,
    private otherPayementService: OtherPaymentsService) { }

  ngOnInit() {
  }

  payAdmission(studentId) {

    var obj = {
      "_id": studentId,
      "installment": {
        "reciept": this.admissionPaymentReciept,
        "amount": this.admissionPaymentAmount1
      }
    }

    this.admissionService.makeAdmissionPayment(obj).subscribe((dataAdmissionPayment) => {
      this.refreshAdmissionData.next(dataAdmissionPayment)
    })
  }


  validateAdmissionForm() {

    this.isAdmissionPayButtonDisable = (this.admissionPaymentAmount1 && (this.admissionPaymentAmount1 == this.admissionPaymentAmount2) && this.admissionPaymentReciept) ? false : true

  }

  validateAdmissionUpdateForm() {
    this.isAdmissionUpdateButtonDisable = (this.updateAdmissionPaymentAmount1 && (this.updateAdmissionPaymentAmount1 == this.updateAdmissionPaymentAmount2) && this.updateAdmissionPaymentReciept) ? false : true
  }

  validateSchoolMonthlyForm() {
    this.isSchoolMonthPayButtonDisable = (this.paymentMonth && this.monthlySchoolFeeReciept) ? false : true
  }

  validateUpdateSchoolFeeForm() {
    this.isSchoolMonthUpdateButtonDisable = (this.updatePaymentMonth && this.updateSchoolFeeReciept) ? false : true
  }

  validateOtherPayment() {
    this.isOtherPaymentButtonDisable = (this.otherPaymentReciept && this.validateOtherPaymentPaidFor) ? false : true
  }

  validateOtherFeeReciept() {
    this.isOtherPaymentUpdateButtonDisable = (this.updateOtherPaymentReciept) ? false : true
  }

  validateDCMonthlyForm() {

    if (this.dcMonthlyPaymentStatusName) {
      var dcFee = this.userData.dcPaymentTypes.find(item => (item.entryName == this.dcMonthlyPaymentStatusName))
      this.dcAmount = dcFee.entryAmount
    }


    this.isDCPayButtonDisable = (this.dcPayementMonth && this.txtDCPayementReciept && this.dcMonthlyPaymentStatusName) ? false : true
  }

  setAdmissionRecordDetail(amount, reciept, recordID, admissionId) {
    this.admissionId = admissionId
    this.admissionInstallmentReciept = reciept
    this.admissionInstallmentRecordID = recordID

    this.updateAdmissionPaymentAmount1 = amount
    this.updateAdmissionPaymentAmount2 = amount
    this.updateAdmissionPaymentReciept = reciept

  }

  deleteAdmissionInstallment() {
    var obj = {
      "_id": this.admissionId,
      "recordId": this.admissionInstallmentRecordID

    }

    this.admissionService.pullInstallment(obj).subscribe((dataAdmissionDeleteInstallment) => {
      this.refreshAdmissionData.next(dataAdmissionDeleteInstallment.admissionCurrent)
    })
  }

  updateAdmissionInstallment() {

    var obj = {
      "_id": this.admissionId,
      "recordId": this.admissionInstallmentRecordID,
      "installment": {
        "reciept": this.updateAdmissionPaymentReciept,
        "amount": this.updateAdmissionPaymentAmount1
      }

    }

    this.admissionService.updateInstallment(obj).subscribe((dataUpdateInstallment) => {
      this.refreshAdmissionData.next(dataUpdateInstallment)
    })


  }

  payMonthlySchoolFee(studentId, amount) {

    this.payMonthlyFee(studentId, amount, 'School Fee', this.monthlySchoolFeeReciept, this.paymentMonth)

  }

  payMonthlyDC(studentId) {
    this.payMonthlyFee(studentId, this.dcAmount, this.dcMonthlyPaymentStatusName, this.txtDCPayementReciept, this.dcPayementMonth)
  }

  payMonthlyFee(studentId, amount, status, reciept, month) {
    var obj = {
      "studentId": studentId,
      "month": month,
      "amount": amount,
      "totalAmount": amount,
      "reciept": reciept,
      "status": status
    }

    this.monthlyService.makeSchoolPayment(obj).subscribe((dataMonthlyPayment) => {
      this.refreshMonthSchoolFeeData.next(dataMonthlyPayment)
    })
  }

  setMonthlyFeeDetail(amount, reciept, recordId, month, studID) {

    this.updateMonthlyFeeAmount = amount
    this.updateSchoolFeeReciept = reciept
    this.monthlySchoolPaymentRecordID = recordId

    this.updatePaymentMonth = month
    this.studentId = studID


  }

  updateMonthlySchoolFee() {

    var obj = {
      "_id": this.monthlySchoolPaymentRecordID,
      "month": this.updatePaymentMonth,
      "studentId": this.studentId,
      "amount": this.updateMonthlyFeeAmount,
      "totalAmount": this.updateMonthlyFeeAmount,
      "reciept": this.updateSchoolFeeReciept
    }


    this.monthlyService.updateSchoolPayment(obj).subscribe((dataMonthPaymentSchool) => {
      this.refreshMonthSchoolFeeData.next(dataMonthPaymentSchool)
    })

  }

  deleteMonthlySchoolFee() {
    var obj = {
      "studentId": this.studentId,
      "monthlyFeeId": this.monthlySchoolPaymentRecordID
    }

    this.monthlyService.deleteSchoolPayment(obj).subscribe((dataMonthlySchoolFeeDelete) => {
      this.refreshMonthSchoolFeeData.next(dataMonthlySchoolFeeDelete)
    })

  }

  getOtherPaymentDate(recID) {

    var record = this.userData.otherPaymentTypes.find(item => (item._id == recID))

    this.otherPaymentRecordId = recID
    this.otherPaymentPaidFor = record.entryName
    this.otherPaymentAmount = record.entryAmount
  }

  payOtherPayment() {

    var obj = {
      "_id": this.userData.otherPayments._id || '',
      "payment": {
        "paidFor": this.otherPaymentPaidFor,
        "reciept": this.otherPaymentReciept,
        "amount": this.otherPaymentAmount
      }
    }

    this.otherPaymentAmount = 0

    this.otherPayementService.makeOtherPayment(obj).subscribe((dataOtherPayment) => {
      this.refreshOtherPaymentsData.next(dataOtherPayment)
    })

  }

  updateOtherPyament() {

    var obj = {
      "_id": this.otherPaymentID,
      "recordID": this.otherPaymentRecordId,
      "payment": {
        "paidFor": this.otherPaymentPaidForID,
        "reciept": this.updateOtherPaymentReciept,
        "amount": this.otherPaymentMount
      }
    }

    this.otherPayementService.updateOtherPayment(obj).subscribe((dataUpdateOtherPayement) => {
      this.refreshOtherPaymentsData.next(dataUpdateOtherPayement)
      console.log(dataUpdateOtherPayement)
    })


  }

  setOtherPayemntDetail(recordID, userID) {

    var record = this.userData.otherPayments.payments.find(item => (item._id == recordID))

    this.otherPaymentRecordId = recordID
    this.otherPaymentID = userID

    this.updateOtherPaymentReciept = record.reciept
    this.otherPaymentPaidForID = record.paidFor
    this.otherPaymentMount = record.amount
  }

  deleteOtherPayment() {

    var obj = {
      "_id": this.otherPaymentID || '',
      "recordID": this.otherPaymentRecordId || ''
    }

    this.otherPayementService.deletePayment(obj).subscribe((deleteOtherPaymentRes) => {
      this.refreshOtherPaymentsData.next(deleteOtherPaymentRes)
    })
  }

}
