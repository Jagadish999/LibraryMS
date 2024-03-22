import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  jsonDate : any = {
    startDate: null,
    endDate: null
  }
  dateForm: FormGroup
  dashboardData: any = {};

  constructor(public ds: DashboardService, public fb: FormBuilder) {

    this.dateForm = this.fb.group({});
  }

  ngOnInit(): void {

    this.initializeDashboard();
    this.initializeForm();

    this.subscribeToStartDateChanges();
    this.subscribeToEndDateChanges();
  }

  initializeForm() {
    this.dateForm = this.fb.group({
      startDate: this.fb.control('', [Validators.required]),
      endDate: this.fb.control('', [Validators.required])
    })
  }

  initializeDashboard() {

    this.ds.getDashboardDetails(this.jsonDate).subscribe(res => {
      this.dashboardData = res[0];
    });
  }

  subscribeToStartDateChanges() {

    const moment = require('moment');

    this.dateForm.get('startDate')?.valueChanges.subscribe(startDate => {

      this.jsonDate.startDate = moment(startDate).format('MMM DD YYYY hh:mmA');

      if(this.jsonDate.startDate && this.jsonDate.endDate) this.initializeDashboard();
    });
  }

  subscribeToEndDateChanges() {

    const moment = require('moment');


    this.dateForm.get('endDate')?.valueChanges.subscribe(endDate => {

      this.jsonDate.endDate = moment(endDate).format('MMM DD YYYY hh:mmA');

      if(this.jsonDate.startDate && this.jsonDate.endDate) this.initializeDashboard();
    });
  }
}
