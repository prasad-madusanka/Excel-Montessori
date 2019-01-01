import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-entries',
  templateUrl: './system-entries.component.html',
  styleUrls: ['./system-entries.component.scss']
})
export class SystemEntriesComponent implements OnInit {

  dEntry: string = 'class 2018'
  dEntryType: string = 'Payment'

  constructor() { }

  ngOnInit() {
  }

}
