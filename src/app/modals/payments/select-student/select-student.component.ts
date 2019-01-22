import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../../../../services/system-entries/entries.service'
import { StudentService } from '../../../../services/students/student.service'
import { OtherPaymentsService } from '../../../../services/payments/other-payments/other-payments.service'
import { environment } from 'src/environments/environment';

declare var $: any

@Component({
  selector: 'app-select-student',
  templateUrl: './select-student.component.html',
  styleUrls: ['./select-student.component.scss']
})
export class SelectStudentComponent implements OnInit {

  studentDetails: any
  filteredStudentDetails: any = []

  searchText: string
  studentId: string = ''
  recordIndex: string = ''

  studClass: string = ''

  userData: any
  paymentTypes: any

  classes: any = []
  isClsAvailable: boolean = false
  officeClassAvailability: string = '- No class found -'

  constructor(private entriesService: EntriesService, private studentService: StudentService,
    private otherPayementService: OtherPaymentsService) { }

  ngOnInit() {
    this.initUI()
  }

  initUI() {
    this.handleModalScrolling()
    this.getNonPaymentEntries()
    this.getOtherPayments()

    this.userData = {

      "_id": "",
      "stName": "",
      "faNIC": "",
      "moNIC": "",
      "otherPaymentId": "",
      "otherPayments": [],
      "monthlyPayments": [],
      "ofFacilityType": "",
      "stAdmittedClass": "",
      "monthlyFeeClass": "",
      "monthlyFee": "",
      "admissionId": "",
      "admissionPaymentsTotalFee": "",
      "admissionInstallmentsCount": "",
      "admissionPaymentStatus": "",
      "admissionInstallments": [],
      "admissionPaidAmount": 0,
      "otherPaymentTypes": "",
      "dcPaymentTypes": "",
      "isOtherPaymentTypes": ""
    }

  }

  handleModalScrolling() {
    $('.modal').on("hidden.bs.modal", function (e) {
      if ($('.modal:visible').length) {
        $('.modal-backdrop').first().css('z-index', parseInt($('.modal:visible').last().css('z-index')) - 10);
        $('body').addClass('modal-open');
      }
    }).on("show.bs.modal", function (e) {
      if ($('.modal:visible').length) {
        $('.modal-backdrop.in').first().css('z-index', parseInt($('.modal:visible').last().css('z-index')) + 10);
        $(this).css('z-index', parseInt($('.modal-backdrop.in').first().css('z-index')) + 10);
      }
    });
  }

  getNonPaymentEntries() {
    this.entriesService.getNonPaymentEntries().subscribe((data => {
      this.classes = data
      this.isClsAvailable = this.isClassesAvailable()
    }))
  }

  isClassesAvailable() {

    if (this.classes.length != 0) {
      this.officeClassAvailability = 'Click to Select Class'
      return true
    } else {
      this.officeClassAvailability = '- No class found -'
      return false
    }
  }

  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].toLowerCase().includes(searchKey)
      })
    })
  }

  search() {
    if (!this.searchText) {
      return this.filteredStudentDetails;
    }
    if (this.searchText) {
      return this.filterIt(this.filteredStudentDetails, this.searchText.toLowerCase());
    }
  }

  getStudent() {

    this.studentService.getStudentByClass(this.studClass).subscribe((dataStudents) => {
      this.studentDetails = dataStudents
      this.filteredStudentDetails = []
      this.studentDetails.forEach(element => {
        this.filteredStudentDetails.push({
          "stName": element.stName,
          "stPreferedName": element.stPreferedName,
          "stDOB": element.stDOB,
          "stGender": element.stGender,
          "stReligion": element.stReligion,
          "stNationality": element.stNationality,
          "stLanguage1": element.stLanguage1,
          "stLanguage2": element.stLanguage2,
          "stHomeAddress": element.stHomeAddress,
          "stHomeTelephone": (element.stHomeTelephone != undefined) ? (element.stHomeTelephone).toString() : '',
          "faName": element.faName,
          "faNIC": element.faNIC,
          "faOccupation": element.faOccupation,
          "faOfficeAddress": element.faOfficeAddress,
          "faMobile": (element.faMobile != undefined) ? (element.faMobile).toString() : '',
          "faOffTelephone": (element.faOffTelephone != undefined) ? (element.faOffTelephone).toString() : '',
          "moName": element.moName,
          "moNIC": element.moNIC,
          "moOccupation": element.moOccupation,
          "moOfficeAddress": element.moOfficeAddress,
          "moMobile": (element.moMobile != undefined) ? (element.moMobile).toString() : '',
          "moOffTelephone": (element.moOffTelephone != undefined) ? (element.moOffTelephone).toString() : '',
          "picUpName1": element.picUpName1,
          "picUpNIC1": element.picUpNIC1,
          "picUpName2": element.picUpName2,
          "picUpNIC2": element.picUpNIC2,
          "ecName": element.ecName,
          "ecRelationship": element.ecRelationship,
          "ecAddress": element.ecAddress,
          "ecTelephone": (element.ecTelephone != undefined) ? (element.ecTelephone).toString() : '',
          "ofFacilityType": (element.ofFacilityType === environment.ADMISSION_DAYCARE_ONLY) ? 'Day Care only' : element.ofFacilityType,
          "stAdmittedMonth": element.stAdmittedMonth,
          "stAdmittedYear": (element.stAdmittedYear != undefined) ? (element.stAdmittedYear).toString() : '',
          "stAdmittedClass": element.stName,
        })
      });

    }, err => {
      this.filteredStudentDetails = []
    })
  }

  setCurrentRecordDetail(recID) {
    this.recordIndex = recID
    this.studentId = this.studentDetails[recID]._id
    this.preparePaymentData(recID)

  }

  preparePaymentData(recID) {

    var vAdmissionPaymentStatus
    var admision = this.studentDetails[recID].admissionPayment
    var amount = 0

    amount = this.admisionPaidAmount(admision.installments)


    if (amount === admision.totalFee) {
      vAdmissionPaymentStatus = { statusMessage: 'Settled', styleClass: 'badge-success' }
    } else if (amount > admision.totalFee) {
      vAdmissionPaymentStatus = { statusMessage: 'Over Paid', styleClass: 'badge-info' }
    } else {
      vAdmissionPaymentStatus = { statusMessage: 'Not Settled', styleClass: 'badge-warning' }
    }

    var vOtherPaymentTypes = this.paymentTypes.filter(item => (item.isSchool == false && item.entryClass == this.studentDetails[recID].stAdmittedClass))
    var vDCTypes = this.paymentTypes.filter(item => (item.isSchool == null && item.entryClass == this.studentDetails[recID].stAdmittedClass))
    
    this.userData = {
      "_id": this.studentDetails[recID]._id,
      "stName": this.studentDetails[recID].stName,
      "faNIC": this.studentDetails[recID].faNIC,
      "moNIC": this.studentDetails[recID].moNIC,
      "otherPaymentId": this.studentDetails[recID].otherPayments._id,
      "otherPayments": this.studentDetails[recID].otherPayments,
      "monthlyPayments": this.studentDetails[recID].monthlyFee,
      "stAdmittedClass": this.studentDetails[recID].stAdmittedClass,
      "ofFacilityType": this.studentDetails[recID].ofFacilityType,
      "monthlyFeeClass": this.studentDetails[recID].monthlyFeeClass.entryAmount,
      "monthlyFee": this.studentDetails[recID].monthlyFee,
      "otherPaymentTypes": vOtherPaymentTypes,
      "dcPaymentTypes": vDCTypes,
      "isOtherPaymentTypes": (vOtherPaymentTypes.length != 0) ? 'Click to Select Entry' : '- No entries found -',

      "admissionId": this.studentDetails[recID].admissionPayment._id,
      "admissionPaymentsTotalFee": this.studentDetails[recID].admissionPayment.totalFee,
      "admissionInstallmentsCount": this.studentDetails[recID].admissionPayment.installments.length,
      "admissionPaymentStatus": vAdmissionPaymentStatus,
      "admissionInstallments": this.studentDetails[recID].admissionPayment.installments,
      "admissionPaidAmount": this.admisionPaidAmount(this.studentDetails[recID].admissionPayment.installments)
    }

  }

  refreshAdmissionPaymentData(response) {

    this.studentDetails[this.recordIndex].admissionPayment = response
    this.preparePaymentData(this.recordIndex)


  }

  refreshMonthleFeeData(response) {
    this.studentDetails[this.recordIndex].monthlyFee = response
    this.preparePaymentData(this.recordIndex)
  }

  refreshOtherPaymentsData(response) {
    this.studentDetails[this.recordIndex].otherPayments = response
    this.preparePaymentData(this.recordIndex)
  }

  admisionPaidAmount(installments) {

    var amount = 0

    if (installments.length != 0) {
      installments.forEach(function (element) {
        amount += element.amount
      })
    }

    return amount

  }

  getOtherPayments() {

    this.otherPayementService.getOtherPayment().subscribe((dataOtherPaymentsEntries) => {
      this.paymentTypes = dataOtherPaymentsEntries
    })

  }


}
