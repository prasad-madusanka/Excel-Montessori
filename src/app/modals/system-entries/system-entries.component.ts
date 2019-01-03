import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../../../services/system-entries/entries.service'

@Component({
  selector: 'app-system-entries',
  templateUrl: './system-entries.component.html',
  styleUrls: ['./system-entries.component.scss']
})
export class SystemEntriesComponent implements OnInit {

  dEntryDetail = {
    '_id': '', 'entryName': '', 'entryYear': 0, 'entryAmount': 0
  }
  dEntryType: string = 'Non-Payment'

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
  tPaymentYear: number
  tUpdatePaymentCategory: string
  tUpdatePaymentAmount: number
  tUpdatePaymentYear: number


  constructor(private entriesService: EntriesService) { }

  ngOnInit() {
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
      this.tUpdatePaymentYear = data.entryYear
    }




  }

  setEntryType(et) {
    this.dEntryType = et
  }

  getNonPaymentEntries() {
    this.entriesService.getNonPaymentEntries().subscribe((data => {
      this.dNonPaymentEntries = data
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
      "entryYear": this.tPaymentYear
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
      "entryYear": this.tUpdatePaymentYear
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

  deleteEntry(){
    (this.dEntryType === 'Payment')? this.deletePaymentEntry(): this.deletNonPaymentEntry()
  }

}
