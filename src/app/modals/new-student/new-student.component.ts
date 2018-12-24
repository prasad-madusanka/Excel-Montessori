import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  illnessesTypes: { illnessesName: string; status: boolean; }[];
  religions: string[];

  officeWithDC: boolean
  officeMonth: string = ''
  officeYear: string = ''
  officeStudClass: string = ''

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  years: any[] = []
  classes: string[] = ['2017']

  isClsAvailable: boolean = false
  officeClassAvailability: string = '- No class found -'

  constructor() {}

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

    this.initOfficeYear()
    this.isClassesAvailable()
    this.isClsAvailable = this.isClassesAvailable()

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
      return true
    } else {
      this.officeClassAvailability = '- No class found -'
      return false
    }
  }

  resetForm() {
    this.nStudent.reset();
  }

}
