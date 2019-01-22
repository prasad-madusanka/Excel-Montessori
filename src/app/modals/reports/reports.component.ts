import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../../../services/system-entries/entries.service'
import { ReportsService } from '../../../services/reports/reports.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  classes: any = []
  officeClassAvailability: string = '- No class found -'

  //Admission
  admissionDetails: any = []
  searchTextAdmission: string = ''
  studClassAdmission: string = ''

  constructor(private entriesService: EntriesService, private reportService: ReportsService) { }

  ngOnInit() {
    this.getNonPaymentEntries()
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

  getNonPaymentEntries() {
    this.entriesService.getNonPaymentEntries().subscribe((data => {
      this.classes = data
      this.isClassesAvailable()
    }))
  }

  getAdmisionDetails() {
    
  }


  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].toLowerCase().includes(searchKey)
      })
    })
  }

  searchAdmissions() {
    if (!this.searchTextAdmission) {
      return this.admissionDetails;
    }
    if (this.searchTextAdmission) {
      return this.filterIt(this.admissionDetails, this.searchTextAdmission.toLowerCase());
    }
  }



}
