import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  illnessesTypes = ['Seizures', 'Allergies', 'Respiratory', 'Illness', 'Drug Reactions', 'Speech Difficulty', 'ADHD']

  constructor() { }

  ngOnInit() {

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

}
