import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntriesService } from '../../../services/system-entries/entries.service'
import { environment } from '../../../environments/environment'
declare var $: any;

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  nStudent: FormGroup

  studentFullName: string = ''
  studentPrefferedName: string = ''
  studentAge: string = ''
  studentGender: string = ''
  studentReligion: string = ''
  studentNationality: string = ''
  studentLanguage1: string = ''
  studentLanguage2: string = ''
  studentAddress: string = ''
  studentHomeTelephone: number
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

  illnessesTypes: { illnessesName: string; status: boolean; }[];
  religions: string[];

  officeWithDC: string = ''
  officeMonth: string = ''
  officeYear: string = ''
  officeStudClass: string = ''

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  years: any[] = []
  classes: any = []
  paymentTypes: any = []
  extraPayments: any = []

  //isClsAvailable: boolean = false
  officeClassAvailability: string = '- No class found -'

  constructor(private entriesService: EntriesService) { }

  ngOnInit() {

    this.nStudent = new FormGroup({
      textOnly: new FormControl(),
      date: new FormControl(),
      numbersOnly: new FormControl(),
      dropdown: new FormControl(),
      dropdownNumber: new FormControl(),
      text: new FormControl(),
      age: new FormControl({ value: '', disabled: true }),
      studentGender: new FormControl(),
      illnessesType: new FormControl(),
      officeWithDC: new FormControl(),
      officeDropdown: new FormControl()
    })

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
      { illnessesName: 'Speech Difficulty', status: false },
      { illnessesName: 'Other', status: false }
    ]

    this.religions = ['Buddhist', 'Catholic', 'Hindu', 'Islam']

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

  resetForm() {
    this.nStudent.reset();
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
      this.extraPayments = this.paymentTypes.filter(items => !items.isSchool)
    }))
  }

  calculateRates() {

    this.schoolMonthlyFee = this.paymentTypes.find(item => (item.entryClass == this.officeStudClass) && (item.entryName == this.officeWithDC))
    this.schoolMonthlyFee = (this.schoolMonthlyFee) ? parseInt(this.schoolMonthlyFee.entryAmount) : 0
    this.schoolYearFee = this.schoolMonthlyFee * 12

    var admissionType = (this.officeWithDC === environment.SCHOOL_WITH_DAYCARE)
      ? environment.ADMISSION_SCHOOL_WITH_DAYCARE
      : environment.ADMISSION_SCHOOL_ONLY

    this.schoolAdmission = this.paymentTypes.find(item => (item.entryClass == this.officeStudClass) && (item.entryName == admissionType))
    this.schoolAdmission = (this.schoolAdmission) ? parseInt(this.schoolAdmission.entryAmount) : 0

    this.calculateTotal()

  }

  calculateExtraPayments(event, itemCharge) {

    (event.currentTarget.checked) ? (this.schoolExtraFees += itemCharge) : (this.schoolExtraFees -= itemCharge)
    this.calculateTotal()
  }

  calculateTotal() {
    this.totalFee = this.schoolYearFee + this.schoolAdmission + this.schoolExtraFees
  }


}
