import { AppointmentService } from './../attendance/appointment/appointment.service';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
// import { ptBR } from 'date-fns/locale';
// import { getDate } from 'date-fns';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public todaysAgenda: any = {
    birthdays: [],
    cardNumbers: { canceledCalls: 0, appointment: 0, servicesPerformed: 0 },
    schedule: []
  };
  public birthdays: any[];
  public today: any = Date.now();

  constructor(
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit() {
    this.getTodaysAgenda();
  }
  getTodaysAgenda() {
    const params: any = {};
    if (this.authenticationService.getFilter()) {
      params.masterId = this.authenticationService.getFilter();
    }

    this.dashboardService.dashboard(params).subscribe(response => {
      this.todaysAgenda = response;
    });
  }

  update(id: string, status: string) {
    this.appointmentService.update({ id, status }).subscribe(response => {
      this.getTodaysAgenda();
    }, err => {

    });
  }


}
