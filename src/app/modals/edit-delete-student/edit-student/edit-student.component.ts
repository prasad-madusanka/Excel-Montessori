import { Component, OnInit} from '@angular/core';
import { EntriesService } from '../../../../services/system-entries/entries.service'
import { StudentService } from '../../../../services/students/student.service'

declare var $: any

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {


  classes: any = []
  studentDetails: any
  filteredStudentDetails: any = []

  studClass: string = ''
  searchText: string

  studentId: string = ''
  recordIndex: string = ''
  studentPrefName: string = ''

  isClsAvailable: boolean = false
  officeClassAvailability: string = '- No class found -'

  recDetail: any
  studentAgeCalculated: string = ''
  studentIllnessTypes: any = []

  studCount: number = 0

  constructor(private entriesService: EntriesService, private studentService: StudentService) { }

  ngOnInit() {
    this.initUI()
  }

  initUI() {
    this.handleModalScrolling()
    this.getNonPaymentEntries()

    this.recDetail = {

      "_id": "",
      "stName": "",
      "stPreferedName": "",
      "stDOB": "",
      "stGender": "",
      "stReligion": "",
      "stNationality": "",
      "stLanguage1": "",
      "stLanguage2": "",
      "stHomeAddress": "",
      "stHomeTelephone": "",
      "faName": "",
      "faNIC": "",
      "faOccupation": "",
      "faOfficeAddress": "",
      "faMobile": "",
      "faOffTelephone": "",
      "moName": "",
      "moNIC": "",
      "moOccupation": "",
      "moOfficeAddress": "",
      "moMobile": "",
      "moOffTelephone": "",
      "picUpName1": "",
      "picUpNIC1": "",
      "picUpName2": "",
      "picUpNIC2": "",
      "ecName": "",
      "ecRelationship": "",
      "ecAddress": "",
      "ecTelephone": "",
      "stIllnessTypes": {
        "Seizures": false,
        "Allergies": false,
        "Respiratory_Illness": false,
        "Drug_Reactions": false,
        "ADHD": false,
        "Speech_Difficulty": true,
      },
      "ofFacilityType": "",
      "stAdmittedMonth": "",
      "stAdmittedYear": "",
      "stAdmittedClass": ""
    }

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

  getNonPaymentEntries() {
    this.entriesService.getNonPaymentEntries().subscribe((data => {
      this.classes = data
      this.isClsAvailable = this.isClassesAvailable()
    }))
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

  getStudent() {

    this.studentService.getStudentByClass(this.studClass).subscribe((dataStudents) => {
      this.studentDetails = dataStudents
      this.filteredStudentDetails = []
      this.studentDetails.forEach((element, index) => {
        this.filteredStudentDetails.push({

          "index": (index + 1).toString(),

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
          "ofFacilityType": element.ofFacilityType,
          "stAdmittedMonth": element.stAdmittedMonth,
          "stAdmittedYear": (element.stAdmittedYear != undefined) ? (element.stAdmittedYear).toString() : '',
          "stAdmittedClass": element.stName
        })
      });

      this.studCount = this.filteredStudentDetails.length

    }, err => {
      this.filteredStudentDetails = []
    })
  }

  deleteStudent() {

    this.studentService.deleteStudent(this.studentId).subscribe((dataStudent) => {
      this.filteredStudentDetails.splice(this.recordIndex, 1)
      this.studentDetails.splice(this.recordIndex, 1)
    })

  }

  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].toLowerCase().includes(searchKey)
      })
    })
  }

  search() {
    if (!this.searchText) {
      return this.filteredStudentDetails;
    }
    if (this.searchText) {
      return this.filterIt(this.filteredStudentDetails, this.searchText.toLowerCase());
    }
  }

  setCurrentRecordDetail(recIndex, studPrefName) {
    this.studentId = this.studentDetails[recIndex]._id
    this.recordIndex = recIndex
    this.studentPrefName = studPrefName
    this.recDetail = this.studentDetails[recIndex]

    this.studentAgeCalculated = this.calculateAge(this.recDetail.stDOB)


    this.studentIllnessTypes = [
      { illnessesName: 'Seizures', status: this.studentDetails[recIndex].stIllnessTypes['Seizures'] },
      { illnessesName: 'Allergies', status: this.studentDetails[recIndex].stIllnessTypes['Allergies'] },
      { illnessesName: 'Respiratory Illness', status: this.studentDetails[recIndex].stIllnessTypes['Respiratory_Illness'] },
      { illnessesName: 'Drug Reactions', status: this.studentDetails[recIndex].stIllnessTypes['Drug_Reactions'] },
      { illnessesName: 'ADHD', status: this.studentDetails[recIndex].stIllnessTypes['ADHD'] },
      { illnessesName: 'Speech Difficulty', status: this.studentDetails[recIndex].stIllnessTypes['Speech_Difficulty'] }
    ]

  }

  calculateAge(dob) {
    return ((new Date().getFullYear()) - (new Date(dob).getFullYear())).toString() + ' years'
  }

  refreshData(res) {
    this.studentDetails[this.recordIndex] = res
  }


}


