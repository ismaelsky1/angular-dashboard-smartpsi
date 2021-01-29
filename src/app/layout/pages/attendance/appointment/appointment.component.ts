import { AuthenticationService } from '../../../../services/authentication.service';
import { PeoplesService } from '../../registre/peoples/peoples.service';
import { AppointmentService } from './appointment.service';
import { Component, HostListener, OnInit } from '@angular/core';

import {
  CalendarOptions
} from '@fullcalendar/angular';

// import momentPlugin from '@fullcalendar/moment';
// import momentTimezonePlugin from '@fullcalendar/moment-timezone';
// import dayGridPlugin from '@fullcalendar/daygrid';

import ptLocale from '@fullcalendar/core/locales/pt-br';

import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

// @HostListener('window:resize', ['$event'])

@Component({
  selector: 'smartpsi-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.less'],
})
export class AppointmentComponent implements OnInit {

  
  
  modal = { isVisible: false, title: 'Nova Sessão', loading: false, cancel: true };
  dateForm: FormGroup;

  public innerWidth: any;

  tokenSession: any = {};

  people: any;
  appointment: any = [];

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: '',
      right: 'title',//'dayGridMonth',

    },
    titleFormat: { day: 'numeric', month: 'numeric', year: 'numeric' },

    buttonText: {
      today: 'Hoje'
    },
    editable: true,
    eventTextColor: 'black',
    locale: 'pt-br',
    //initialView: 'timeline',//'dayGridDay',//'dayGridWeek',
    
    eventColor: 'black',
    dayMaxEvents: true,
    dateClick: this.handleDateClick.bind(this),
    events: this.appointment,
    eventClick: this.handleEventClick.bind(this)
  };


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: AppointmentService,
    private peoplesService: PeoplesService,
    private authenticationService: AuthenticationService
  ) { }

  

  ngOnInit(): void {
    

    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 500){
      this.calendarOptions.initialView = 'dayGridDay'
    }
    this.index();
    this.loadPeople();

    this.tokenSession = this.authenticationService.getTokenDecode();

    this.dateForm = this.formBuilder.group({
      id: null,
      usersId: [null, [Validators.required]],
      start_hour: [null, [Validators.required]],
      end_hour: [null, [Validators.required]],
      peoplesId: [null, [Validators.required]],
      status: [null, [Validators.required]],
      date: [null, [Validators.required]]
    });
  }


  index() {
    const params: any = {};

    if (this.authenticationService.getFilter()) {
      params.usersId = this.authenticationService.getFilter();
    }

    this.service.index(params).subscribe((response) => {
      this.appointment = [];

      response.forEach((element) => {
        let elem: any = {
          id: element.id,
          groupId: element.peoples.id,
          title: element.peoples.name,
          start: element.start_hour,
          end: element.end_hour,
          extendedProps: element
        };
        if (elem.extendedProps.status === 'CONCLUDED') {
          elem.backgroundColor = 'green';
          elem.borderColor = 'green';
          elem.textColor = 'black';
        }
        if (elem.extendedProps.status === 'CANCELED') {
          elem.backgroundColor = 'red';
          elem.borderColor = 'red';
          elem.textColor = 'black';

        }
        if (elem.extendedProps.status === 'OPEN') {
          elem.backgroundColor = 'blue';
          elem.borderColor = 'blue';
          elem.textColor = 'black';

        }

        this.appointment.push(elem);
      });
      this.calendarOptions.events = this.appointment;
    });
  }

  store() {
    this.modal.loading = true;
    this.service.store(this.dateForm.value).subscribe(
      (response) => {
        this.index();
        this.modal.isVisible = false;
        this.modal.loading = false;
      },
      (err) => {
        this.modal.loading = false;
      }
    );
  }

  update() {
    this.modal.loading = true;

    this.service.update(this.dateForm.value).subscribe(
      (response) => {
        this.index();
        this.modal.isVisible = false;
        this.modal.loading = false;
      },
      (err) => {
        this.modal.loading = false;
      }
    );
  }

  loadPeople() {
    const params: any = {};

    if (this.authenticationService.getFilter()) {
      params.masterId = this.authenticationService.getFilter();
    }

    this.peoplesService.index(params).subscribe((response) => {
      this.people = response;
    });
  }

  handleEventClick(data) {

    this.openModal();

    this.modal.title = data.event.title;

    this.dateForm.patchValue(data.event.extendedProps);
    this.dateForm.controls['date'].setValue(
      formatDate(data.event.startStr, 'yyyy-MM-dd', 'pt')
    );
  }

  handleDateClick(event: any = null): void {

    this.openModal();

    this.modal.title =
      'Nova Sessão - ' + formatDate(event.dateStr, 'dd-MM-yyyy', 'pt');
    this.dateForm.controls['date'].setValue(formatDate(event.dateStr, 'yyyy-MM-dd', 'pt'));
    this.dateForm.controls['start_hour'].setValue(event.date);
    this.dateForm.controls['end_hour'].setValue(event.date);

  }

  openModal() {
    this.dateForm.reset({ status: 'OPEN' });

    const usersId = this.authenticationService.getFilter();

    this.dateForm.controls.usersId.setValue(usersId);

    this.modal.isVisible = true;
    this.modal.cancel = true;
  }

  handleModalOk(): void {
    for (const i in this.dateForm.controls) {
      this.dateForm.controls[i].markAsDirty();
      this.dateForm.controls[i].updateValueAndValidity();
      if(this.dateForm.controls[i].invalid){
        console.log(i)
      }
    }

    if (this.dateForm.valid) {
      if (this.dateForm.value.id) {
        this.update();
      } else {
        this.store();
      }
    }
  }

  handleModalCancel(): void {
    this.modal.isVisible = false;
  }

  submitForm(): void { }
}
