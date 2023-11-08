import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-date-and-time',
  templateUrl: './date-and-time.component.html',
  styleUrls: ['./date-and-time.component.scss']
})
export class DateAndTimeComponent implements OnDestroy{
  currentDate: Date = new Date();

  constructor() {

  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  interval = setInterval(() => {
    this.getCurrentDateAndTime()
  }, 1000);

  getCurrentDateAndTime() {
    this.currentDate = new Date();
  }
}
