import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../../../services/system-entries/entries.service'

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


  constructor(private entriesService: EntriesService) { }

  ngOnInit() {

    this.schoolFeeCategories = ['School only', 'Admission - School only', 'Admission - School with Day Care', 'Admission - Day Care only']
    this.DCFeeCategories = ['Above 2Y - Full Day / Month', 'Above 2Y - Half Day / Month', 'Under 2Y - Full Day / Month', 'Under 2Y - Half Day / Month', 'Daily Basis - Full Day', 'Daily Basis - Half Day', 'Saturday Care - Full Day', 'Saturday Care - Half Day']

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
      this.dNonPaymentEntries.push(data)
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
      this.dPaymentEntries.push(data)
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
      this.dPaymentEntries.push(data)
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
      this.dPaymentEntries.push(data)
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


}
