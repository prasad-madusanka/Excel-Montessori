import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EntriesService } from '../../../services/system-entries/entries.service'
import { environment } from '../../../environments/environment'
import { StudentService } from '../../../services/students/student.service'
declare var $: any;

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  //Student details
  studentFullName: string = ''
  studentPrefferedName: string = ''

  studentDOB: string = ''
  studentAge: string = ''

  studentGender: string = ''
  studentReligion: string = ''
  studentNationality: string = ''
  studentLanguage1: string = ''
  studentLanguage2: string = ''
  studentAddress: string = ''
  studentHomeTelephone: number

  //Student father's detail
  studentFathersName: string = ''
  studentFathersNIC: string = ''
  studentFathersOccupation: string = ''
  studentFathersOffiAddr: string = ''
  studentFathersMobileNumber: number
  studentFathersOfficeNumber: number
  studentMothersName: string = ''
  studentMothersNIC: string = ''
  studentMothersOccupation: string = ''
  studentMothersOffiAddr: string = ''
  studentMothersMobileNumber: number
  studentMothersOfficeNumber: number
  studentPickingUppersName1: string = ''
  studentPickingUppersNIC1: string = ''
  studentPickingUppersName2: string = ''
  studentPickingUppersNIC2: string = ''
  studentPersonToContactInEmergName: string = ''
  studentPersonToContactInEmergRelationship: string = ''
  studentPersonToContactInEmergAddr: string = ''
  studentPersonToContactInEmergTelephone: number



  schoolMonthlyFee: any
  schoolYearFee: any
  schoolAdmission: any
  schoolExtraFees: number = 0
  totalFee: number = 0

  officeWithDC: string = ''
  officeMonth: string = ''
  officeYear: string = ''
  officeStudClass: string = ''

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  years: any[] = []
  classes: any = []
  paymentTypes: any = []
  extraPayments: any = []
  daycarePayment: any = []

  daycareCharge: string = ''

  //isClsAvailable: boolean = false
  showDayCareChargers: boolean = true
  officeClassAvailability: string = '- No class found -'


  illnessesTypes: { illnessesName: string; status: boolean; }[];
  religions: string[];
  nationality: string[]
  languages: string[]

  isSaveButtonDisabled: boolean = true

  constructor(private entriesService: EntriesService, private studentService: StudentService) { }

  ngOnInit() {

    this.initUIValues()
    this.initCalendar()

  }

  initUIValues() {

    this.initOfficeYear()
    this.getNonPaymentEntries()
    this.getPaymentEntries()

    this.illnessesTypes = [
      { illnessesName: 'Seizures', status: false },
      { illnessesName: 'Allergies', status: false },
      { illnessesName: 'Respiratory Illness', status: false },
      { illnessesName: 'Drug Reactions', status: false },
      { illnessesName: 'ADHD', status: false },
      { illnessesName: 'Speech Difficulty', status: false }
    ]

    this.religions = ['Buddhist', 'Catholic', 'Hindu', 'Islam', 'Other']
    this.nationality = ['Sinhaleese', 'Tamil', 'Muslim', 'Burgher', 'Other']
    this.languages = ['Sinhala', 'English', 'Tamil', 'Other']

  }

  initCalendar() {
    $('.datetimepicker').datetimepicker({
      icons: {
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      },
      format: 'L'
    });

  }

  setDOB(dob) {
    this.studentDOB = dob
    this.studentAge = ((new Date().getFullYear()) - (new Date(dob).getFullYear())).toString() + ' years'
  }

  initOfficeYear() {

    var tDate = new Date().getFullYear() - 1;
    this.years.push(--tDate)
    this.years.push(++tDate)
    this.years.push(++tDate)
    this.years.push(++tDate)

  }

  isClassesAvailable() {

    if (this.classes.length != 0) {
      this.officeClassAvailability = 'Click to Select Class'
    } else {
      this.officeClassAvailability = '- No class found -'
    }
  }

  getNonPaymentEntries() {
    this.entriesService.getNonPaymentEntries().subscribe((data => {
      this.classes = data
      this.isClassesAvailable()
    }))
  }

  getPaymentEntries() {
    this.entriesService.getPaymentEntries().subscribe((data => {
      this.paymentTypes = data
      // this.extraPayments = this.paymentTypes.filter(items => items.isSchool == false)
      //this.daycarePayment = this.paymentTypes.filter(items => items.isSchool == null)
    }))
  }

  saveStudent() {

    var obj = {
      "stName": this.studentFullName,
      "stPreferedName": this.studentPrefferedName,
      "stDOB": this.studentDOB,
      "stGender": this.studentGender,
      "stReligion": this.studentReligion,
      "stNationality": this.studentNationality,
      "stLanguage1": this.studentLanguage1,
      "stLanguage2": this.studentLanguage2,
      "stHomeAddress": this.studentAddress,
      "stHomeTelephone": this.studentHomeTelephone,

      "faName": this.studentFathersName,
      "faNIC": this.studentFathersNIC,
      "faOccupation": this.studentFathersOccupation,
      "faOfficeAddress": this.studentFathersOffiAddr,
      "faMobile": this.studentFathersMobileNumber,
      "faOffTelephone": this.studentFathersOfficeNumber,

      "moName": this.studentMothersName,
      "moNIC": this.studentMothersNIC,
      "moOccupation": this.studentMothersOccupation,
      "moOfficeAddress": this.studentMothersOffiAddr,
      "moMobile": this.studentMothersMobileNumber,
      "moOffTelephone": this.studentMothersOfficeNumber,

      "picUpName1": this.studentPickingUppersName1,
      "picUpNIC1": this.studentPickingUppersNIC1,
      "picUpName2": this.studentPickingUppersName2,
      "picUpNIC2": this.studentPickingUppersNIC2,

      "ecName": this.studentPersonToContactInEmergName,
      "ecRelationship": this.studentPersonToContactInEmergRelationship,
      "ecAddress": this.studentPersonToContactInEmergAddr,
      "ecTelephone": this.studentPersonToContactInEmergTelephone,

      "ofFacilityType": this.officeWithDC,
      "stAdmittedMonth": this.officeMonth,
      "stAdmittedYear": this.officeYear,

      "stAdmittedClass": this.officeStudClass,

      "illSeizures": this.illnessesTypes[0].status,
      "illAllergies": this.illnessesTypes[1].status,
      "illRespiratory_Illness": this.illnessesTypes[2].status,
      "illDrug_Reactions": this.illnessesTypes[3].status,
      "illADHD": this.illnessesTypes[4].status,
      "illSpeech_Difficulty": this.illnessesTypes[5].status,

      "admissionFee": this.schoolAdmission
    }

    this.studentService.insertNewStudent(obj).subscribe((dataStudent) => {

    })

  }

  calculateAdmission() {
    this.schoolAdmission = this.paymentTypes.find(item => (item.entryClass == this.officeStudClass) && (item.entryName == this.officeWithDC)) || 0
    this.schoolAdmission = this.schoolAdmission.entryAmount || 0
    this.isSaveButtonDisabled = (this.schoolAdmission == 0) ? true : false
  }

  getIllnessType(illnessesName) {
    this.illnessesTypes.filter(item => (item.illnessesName === illnessesName))
  }

  validateForm() {

    this.isSaveButtonDisabled = (this.studentFullName && this.studentPrefferedName && this.studentDOB &&
      this.studentGender && this.studentReligion && this.studentNationality && this.studentLanguage1 &&
      this.studentLanguage2 && this.studentAddress && this.studentHomeTelephone && this.studentPersonToContactInEmergName &&
      this.studentPersonToContactInEmergRelationship && this.studentPersonToContactInEmergAddr && this.studentPersonToContactInEmergTelephone &&
      this.officeWithDC && this.officeMonth && this.officeYear && this.officeStudClass && this.schoolAdmission != 0) ? false : true

  }

}
