import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../../../services/system-entries/entries.service'

declare var $: any

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  dStudentName: string = 'Prasad Madusanka'
  classes: any = []
  studClass: string = ''


  isClsAvailable: boolean = false
  officeClassAvailability: string = '- No class found -'

  constructor(private entriesService: EntriesService) { }

  ngOnInit() {
    this.initUI()
  }

  initUI(){
    this.handleModalScrolling()
    this.getNonPaymentEntries()
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


}
