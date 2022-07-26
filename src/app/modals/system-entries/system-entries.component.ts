import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../../../services/system-entries/entries.service'
import { environment } from 'src/environments/environment';

declare var $: any

@Component({
  selector: 'app-system-entries',
  templateUrl: './system-entries.component.html',
  styleUrls: ['./system-entries.component.scss']
})
export class SystemEntriesComponent implements OnInit {

  schoolFeeCategories: string[] = []
  DCFeeCategories: string[] = []

  dEntryDetail = {
    '_id': '', 'entryName': '', 'entryYear': 0, 'entryAmount': 0
  }
  dEntryType: string = 'Non-Payment'
  classAvailability: string = '- No class found -'
  isSchool: boolean = false

  dNonPaymentEntries: any = []
  dPaymentEntries: any = []

  recordId: string
  recordIndex: number

  tNonPaymentClassName: string
  tNonPaymentYear: number
  tUpdateNonPaymentClassName: string
  tUpdateNonPaymentClassYear: number

  tPaymentCategory: string
  tPaymentAmount: number
  tPaymentClass: string = ''
  tUpdatePaymentCategory: string
  tUpdatePaymentAmount: number
  tUpdatePaymentClass: string = ''

  tSchoolPaymentType: string = ''
  tSchoolPaymentAmount: number
  //tSchoolPaymentYear: number
  tSchoolPaymentClass: string = ''

  tDCPaymentType: string = ''
  tDCPaymentAmount: number
  tDCPaymentClass: string = ''

  invalidAttemp: string = ''
  classInvalidAttempt: string = ''


  isNpEntriesUpdateButtonDisable: boolean = true
  isNpEntriesSaveButtonDisable: boolean = true
  isUpdateAmountDisabled: boolean = false
  isExtraFeeSaveDisabled: boolean = true
  isSchoolFeeSaveDisabled: boolean = true
  isDayCareFeeSaveDisabled: boolean = true

  constructor(private entriesService: EntriesService) { }

  ngOnInit() {

    this.schoolFeeCategories = ['School only', 'Admission - School only', 'Admission - School with Day Care', 'Admission - Day Care only']
    this.DCFeeCategories = environment.DAY_CARE_FEE_CATEGORIES

    this.handleModalScrolling()
    this.getNonPaymentEntries()
    this.getPaymentEntries()


  }

  setCurrentRecordDetail(id, recIndex, data) {
    this.recordId = id
    this.recordIndex = recIndex
    this.dEntryDetail = data

    if (data.entryAmount == undefined) {
      this.tUpdateNonPaymentClassName = data.entryName
      this.tUpdateNonPaymentClassYear = data.entryYear
    } else {
      this.tUpdatePaymentCategory = data.entryName
      this.tUpdatePaymentAmount = data.entryAmount
      this.tUpdatePaymentClass = data.entryClass
      this.isSchool = (data.isSchool == false) ? false : true
    }




  }

  setEntryType(et) {
    this.dEntryType = et
    this.invalidAttemp = ''
  }

  getNonPaymentEntries() {
    this.entriesService.getNonPaymentEntries().subscribe((data => {
      this.dNonPaymentEntries = data
      this.isClassesAvailable()
    }))
  }

  addNonPaymentEntry() {

    var obj = {
      "entryName": this.tNonPaymentClassName,
      "entryYear": this.tNonPaymentYear
    }

    this.entriesService.addNonPaymentEntry(obj).subscribe((data => {

      if (data['message']) {
        this.invalidAttemp = data['message']
      } else {
        this.invalidAttemp = ''
        this.dNonPaymentEntries.push(data)
      }


    }))
  }

  updateNonPaymentEntry() {

    var obj = {
      "eid": this.recordId,
      "entryName": this.tUpdateNonPaymentClassName,
      "entryYear": this.tUpdateNonPaymentClassYear
    }

    this.entriesService.updateNonPaymentEntry(obj).subscribe((data => {

      this.dNonPaymentEntries[this.recordIndex] = data

    }))
  }

  deletNonPaymentEntry() {
    this.entriesService.deleteNonPaymentEntry(this.recordId).subscribe((data) => {
      this.dNonPaymentEntries.splice(this.recordIndex, 1)
    })
  }

  getPaymentEntries() {
    this.entriesService.getPaymentEntries().subscribe((data => {
      this.dPaymentEntries = data
    }))
  }

  addPaymentEntry() {

    var obj = {
      "entryName": this.tPaymentCategory,
      "entryAmount": this.tPaymentAmount,
      "entryClass": this.tPaymentClass,
      "isSchool": false
    }

    this.entriesService.addPaymentEntry(obj).subscribe((data => {

      if (data['message']) {
        this.invalidAttemp = data['message']
      } else {
        this.invalidAttemp = ''
        this.dPaymentEntries.push(data)
      }

    }))
  }

  updatePaymentEntry() {

    var obj = {
      "eid": this.recordId,
      "entryName": this.tUpdatePaymentCategory,
      "entryAmount": this.tUpdatePaymentAmount,
      "entryClass": this.tUpdatePaymentClass
    }

    this.entriesService.updatePaymentEntry(obj).subscribe((data => {
      this.dPaymentEntries[this.recordIndex] = data
    }))

  }

  deletePaymentEntry() {
    this.entriesService.deletePaymentEntry(this.recordId).subscribe((date) => {
      this.dPaymentEntries.splice(this.recordIndex, 1)
    })
  }

  deleteEntry() {
    (this.dEntryType === 'Payment') ? this.deletePaymentEntry() : this.deletNonPaymentEntry()
  }

  addScoolPaymentEntry() {

    var obj = {
      "entryName": this.tSchoolPaymentType,
      "entryAmount": this.tSchoolPaymentAmount,
      "entryClass": this.tSchoolPaymentClass,
      "isSchool": true
    }

    this.entriesService.addPaymentEntry(obj).subscribe((data => {

      if (data['message']) {
        this.invalidAttemp = data['message']
      } else {
        this.invalidAttemp = ''
        this.dPaymentEntries.push(data)
      }
    }))

  }

  addDCPaymentEntry() {
    var obj = {
      "entryName": this.tDCPaymentType,
      "entryAmount": this.tDCPaymentAmount,
      "entryClass": this.tDCPaymentClass,
      "isSchool": null
    }

    this.entriesService.addPaymentEntry(obj).subscribe((data => {

      if (data['message']) {
        this.invalidAttemp = data['message']
      } else {
        this.invalidAttemp = ''
        this.dPaymentEntries.push(data)
      }

    }))
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

  isClassesAvailable() {

    if (this.dNonPaymentEntries.length != 0) {
      this.classAvailability = 'Click to Select Class'
    } else {
      this.classAvailability = '- No class found -'
    }
  }

  validateClasses() {

    var className = this.tNonPaymentClassName
    if (className) {
      var npClasses = this.dNonPaymentEntries.find(item => (item.entryName.replace(/ /gi, '').toLowerCase() == className.replace(/ /gi, '').toLowerCase()))
      this.isNpEntriesSaveButtonDisable = (npClasses == undefined && className && this.tNonPaymentYear) ? false : true
      this.classInvalidAttempt = (npClasses != undefined) ? '* Class name already exist *' : ''
    }
  }

  validateClassesOnUpdate() {
    this.isNpEntriesUpdateButtonDisable = (this.tUpdateNonPaymentClassYear) ? false : true
  }

  validatePaymentEntriesUpdate() {
    this.isUpdateAmountDisabled = (this.tUpdatePaymentAmount) ? false : true
  }

  validateExtraPayment() {
    this.isExtraFeeSaveDisabled = (this.tPaymentCategory && this.tPaymentAmount && this.tPaymentClass) ? false : true
  }

  validateSchoolPayment() {
    this.isSchoolFeeSaveDisabled = (this.tSchoolPaymentType && this.tSchoolPaymentAmount && this.tSchoolPaymentClass) ? false : true
  }

  validateDayCarePayments() {
    this.isDayCareFeeSaveDisabled = (this.tDCPaymentType && this.tDCPaymentAmount && this.tDCPaymentClass) ? false : true
  }

}
