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
  admissionDetailsAll: any = []
  admissionDetails: any = []
  searchTextAdmission: string = ''
  studClassAdmission: string = ''
  studAmissionCount: number = 0

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

  getAdmisionDetails(admittedClass) {
    this.reportService.getAdmissionReport('NOT PAID').subscribe((dataAdmission) => {
      this.admissionDetailsAll = dataAdmission
      this.admissionDetails = this.prepareAdmissionData(this.admissionDetailsAll.filter(item => (item.studentId.stAdmittedClass == admittedClass)))
      this.studAmissionCount = this.admissionDetails.length
    })
  }

  prepareAdmissionData(array) {

    var res = []

    array.forEach(function (elm, index) {

      var element = elm.studentId

      res.push({

        'index': (index + 1).toString(),

        'totalFee': elm.totalFee.toString(),
        'installments': elm.installments.length.toString(),

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
        "ofFacilityType": element.ofFacilityType.replace('Admission - ',''),
        "stAdmittedMonth": element.stAdmittedMonth,
        "stAdmittedYear": (element.stAdmittedYear != undefined) ? (element.stAdmittedYear).toString() : '',
        "stAdmittedClass": element.stName,

      })
    });

    return res

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
