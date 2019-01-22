import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { EntriesService } from '../../../../services/system-entries/entries.service'
import { StudentService } from '../../../../services/students/student.service'

declare var $: any

@Component({
  selector: 'app-modal-update-student',
  templateUrl: './modal-update-student.component.html',
  styleUrls: ['./modal-update-student.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalUpdateStudentComponent implements OnInit {

  @Input() selectedRecord: any
  @Input() age: string
  @Input() illnessTypes: any

  @Output() refreshData = new EventEmitter<object>()

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


  //illnessesTypes: { illnessesName: string; status: boolean; }[];
  religions: string[];
  nationality: string[]
  languages: string[]



  constructor(private entriesService: EntriesService, private studentService: StudentService) { }

  ngOnInit() {

    this.initUIValues()
    this.initCalendar()

  }

  initUIValues() {

    this.initOfficeYear()
    this.getNonPaymentEntries()
    this.getPaymentEntries()

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

  getPaymentEntries() {
    this.entriesService.getPaymentEntries().subscribe((data => {
      this.paymentTypes = data
      // this.extraPayments = this.paymentTypes.filter(items => items.isSchool == false)
      //this.daycarePayment = this.paymentTypes.filter(items => items.isSchool == null)
    }))
  }

  calculateAdmission() {

    this.officeStudClass = this.selectedRecord.stAdmittedClass
    this.officeWithDC = this.selectedRecord.ofFacilityType

    this.schoolAdmission = this.paymentTypes.find(item => (item.entryClass == this.officeStudClass) && (item.entryName == this.officeWithDC)) || 0
    return this.schoolAdmission = this.schoolAdmission.entryAmount || 0

  }

  setGender(stGender) {
    this.studentGender = stGender
  }

  updateStudent() {


    var obj = {

      "studentId": this.selectedRecord._id,
      "illnessTypeId": this.selectedRecord.stIllnessTypes._id,

      "stName": this.studentFullName || this.selectedRecord.stName,
      "stPreferedName": this.studentPrefferedName || this.selectedRecord.stPreferedName,
      "stDOB": this.studentDOB || this.selectedRecord.stDOB,
      "stGender": this.studentGender || this.selectedRecord.stGender,
      "stReligion": this.studentReligion || this.selectedRecord.stReligion,
      "stNationality": this.studentNationality || this.selectedRecord.stNationality,
      "stLanguage1": this.studentLanguage1 || this.selectedRecord.stLanguage1,
      "stLanguage2": this.studentLanguage2 || this.selectedRecord.stLanguage2,
      "stHomeAddress": this.studentAddress || this.selectedRecord.stHomeAddress,
      "stHomeTelephone": this.studentHomeTelephone || this.selectedRecord.stHomeTelephone,

      "faName": this.studentFathersName || this.selectedRecord.faName,
      "faNIC": this.studentFathersNIC || this.selectedRecord.faNIC,
      "faOccupation": this.studentFathersOccupation || this.selectedRecord.faOccupation,
      "faOfficeAddress": this.studentFathersOffiAddr || this.selectedRecord.faOfficeAddress,
      "faMobile": this.studentFathersMobileNumber || this.selectedRecord.faMobile,
      "faOffTelephone": this.studentFathersOfficeNumber || this.selectedRecord.faOffTelephone,

      "moName": this.studentMothersName || this.selectedRecord.moName,
      "moNIC": this.studentMothersNIC || this.selectedRecord.moNIC,
      "moOccupation": this.studentMothersOccupation || this.selectedRecord.moOccupation,
      "moOfficeAddress": this.studentMothersOffiAddr || this.selectedRecord.moOfficeAddress,
      "moMobile": this.studentMothersMobileNumber || this.selectedRecord.moMobile,
      "moOffTelephone": this.studentMothersOfficeNumber || this.selectedRecord.moOffTelephone,

      "picUpName1": this.studentPickingUppersName1 || this.selectedRecord.picUpName1,
      "picUpNIC1": this.studentPickingUppersNIC1 || this.selectedRecord.picUpNIC1,
      "picUpName2": this.studentPickingUppersName2 || this.selectedRecord.picUpName2,
      "picUpNIC2": this.studentPickingUppersNIC2 || this.selectedRecord.picUpNIC2,

      "ecName": this.studentPersonToContactInEmergName || this.selectedRecord.ecName,
      "ecRelationship": this.studentPersonToContactInEmergRelationship || this.selectedRecord.ecRelationship,
      "ecAddress": this.studentPersonToContactInEmergAddr || this.selectedRecord.ecAddress,
      "ecTelephone": this.studentPersonToContactInEmergTelephone || this.selectedRecord.ecTelephone,

      "ofFacilityType": this.officeWithDC || this.selectedRecord.ofFacilityType,
      "stAdmittedMonth": this.officeMonth || this.selectedRecord.stAdmittedMonth,
      "stAdmittedYear": this.officeYear || this.selectedRecord.stAdmittedYear,

      "stAdmittedClass": this.officeStudClass || this.selectedRecord.stAdmittedClass,

      "illSeizures": this.illnessTypes[0].status,
      "illAllergies": this.illnessTypes[1].status,
      "illRespiratory_Illness": this.illnessTypes[2].status,
      "illDrug_Reactions": this.illnessTypes[3].status,
      "illADHD": this.illnessTypes[4].status,
      "illSpeech_Difficulty": this.illnessTypes[5].status,

      "admissionFee": this.schoolAdmission || this.calculateAdmission()
    }


    this.studentService.updateStudent(obj).subscribe((dataStudentUpdate) => {
      this.refreshData.next(dataStudentUpdate)
    })

  }

}
