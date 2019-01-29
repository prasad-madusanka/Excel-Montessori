import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../../../services/system-entries/entries.service'
import { ReportsService } from '../../../services/reports/reports.service'
import { environment } from 'src/environments/environment';

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

  //Monthyl
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  monthModel: string = this.months[0]
  monthlyPaymentDetails: any = []
  monthlyPaymentDetailsFull: any = []
  monthlyClassName: string = ''
  searchTextMonthlyPayments: string = ''
  studMonthlyPaymentCount: number = 0

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
        "ofFacilityType": element.ofFacilityType.replace('Admission - ', ''),
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

  searchMonthlyPayments() {
    if (!this.searchTextMonthlyPayments) {
      return this.monthlyPaymentDetails;
    }
    if (this.searchTextMonthlyPayments) {
      return this.filterIt(this.monthlyPaymentDetails, this.searchTextMonthlyPayments.toLowerCase());
    }
  }

  prepareMonthlyPayments(array) {

    var res = []

    array.forEach(function (element, index) {

      //var element = elm.studentId

      res.push({

        'index': (index + 1).toString(),

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
        "ofFacilityType": element.ofFacilityType.replace('Admission - ', ''),
        "stAdmittedMonth": element.stAdmittedMonth,
        "stAdmittedYear": (element.stAdmittedYear != undefined) ? (element.stAdmittedYear).toString() : '',
        "stAdmittedClass": element.stName,
        "cat1": element.cat1,
        "stat1": element.stat1,
        "cat2": element.cat2,
        "stat2": element.stat2
      })
    });


    this.studMonthlyPaymentCount = res.length

    return res

  }

  getMonthlyPayments() {
    this.monthlyPaymentDetails = this.prepareMonthlyPayments(this.filterByMonths(this.monthlyPaymentDetailsFull, this.monthModel))
  }

  monthlyPaymentsOnClassChange() {

    var obj = {
      "isDiscontinued": false,
      "className": this.monthlyClassName
    }

    this.reportService.getMonthlyPaymentReport(obj).subscribe((dataMonthlyDetails) => {
      this.monthlyPaymentDetailsFull = dataMonthlyDetails
      this.monthlyPaymentDetails = this.prepareMonthlyPayments(this.filterByMonths(dataMonthlyDetails, this.monthModel))
    })

  }

  filterByMonths(arr, month) {

    var ret = []

    arr.forEach(function (element, index) {

      var mf = element.monthlyFee
      var monthlyFees = mf.filter(item => (item.month == month))

      //School Fee
      element['cat1'] = 'School Fee'
      element['stat1'] = 'N/A'

      //Day Care Fee
      element['cat2'] = 'Day Care'
      element['stat2'] = 'N/A'


      if (element.ofFacilityType == environment.ADMISSION_DAYCARE_ONLY) {
        element['cat1'] = 'School Fee'
        element['stat1'] = 'N/A'
      } else {
        if (monthlyFees.find(item => (item.status == "School Fee"))) {
          element['cat1'] = 'School Fee'
          element['stat1'] = 'PAID'
        } else {
          element['cat1'] = 'School Fee'
          element['stat1'] = 'NOT_PAID'
        }
      }


      var dcStatus = monthlyFees.find(item => (item.status != 'School Fee'))

      if (element.ofFacilityType == environment.SCHOOL_ONLY) {
        element['cat2'] = 'Day Care'
        element['stat2'] = 'N/A'
      } else {
        if (dcStatus) {
          element['cat2'] = dcStatus.status
          element['stat2'] = 'PAID'
        } else {
          element['cat2'] = 'Day Care'
          element['stat2'] = 'NOT_PAID'
        }
      }

      if (element.stat1 == 'NOT_PAID' || element.stat2 == 'NOT_PAID') {
        ret.push(element)
      }

    })

    return ret

  }

}
