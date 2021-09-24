import { AppointmentService } from './../../attendance/appointment/appointment.service';
import { AuthenticationService } from './../../../../services/authentication.service';
import { FinanceService } from './finance.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { PeoplesService } from '../../registre/peoples/peoples.service';

@Component({
  selector: 'smartpsi-person',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.less'],
})
export class FinanceComponent implements OnInit {
  formModal: FormGroup;

  modal = { isVisible: false, title: null, loading: false };

  collection: any = [];
  peoples: any = [];

  filter = {
    type: null,
    usersId: null,
    peoplesId: null,
    date: [],
  };

  token: any;

  loadingCollection: boolean = false;
  loadingPeoples: boolean = false;

  loadingPDF: boolean;

  income: Number;
  cost: Number;
  gain: Number;

  constructor(
    private formBuilder: FormBuilder,
    private service: FinanceService,
    private authenticationService: AuthenticationService,
    private appointmentService: AppointmentService,
    private peoplesService: PeoplesService
  ) {}

  ngOnInit(): void {
    this.token = this.authenticationService.getTokenDecode();

    this.getDateFilter();
    this.indexPeople();
    this.index();

    this.formModal = this.formBuilder.group({
      id: null,
      type: [null, Validators.required],
      value: [null, Validators.required],
      peoplesId: [null],
      usersId: null,
      obs: [null, Validators.maxLength(200)],
    });
  }

  getDateFilter() {
    let dt = new Date();
    let month = dt.getMonth();
    let year = dt.getFullYear();

    this.filter.date = [
      new Date(year, month, 1),
      new Date(year, month + 1, 0),
    ];
  }

  indexPeople() {
    this.loadingPeoples = true;

    const params: any = {};
    if (this.authenticationService.getFilter()) {
      params.masterId = this.authenticationService.getFilter();
    }
    this.peoplesService.index(params).subscribe(
      (response) => {
        this.peoples = response;
        this.loadingPeoples = false;
      },
      (err) => {
        this.loadingPeoples = false;
      }
    );
  }

  index() {
    this.loadingCollection = true;

    const params: any = {};
    if (this.authenticationService.getFilter()) {
      params.usersId = this.authenticationService.getFilter();
    }

    if (this.filter.type) {
      params.type = this.filter.type;
    }

    if (this.filter.peoplesId) {
      params.peoplesId = this.filter.peoplesId;
    }

    if (this.filter.date) {
      params.date = this.filter.date;
    } else {
    }
    console.log(params);
    this.service.index(params).subscribe(
      (response) => {
        this.collection = response;
        this.loadingCollection = false;
        this.getCard();
      },
      (err) => {
        this.loadingCollection = false;
      }
    );
  }

  getCard() {
    let totalInput = [];
    let totalOutput = [];
    this.collection.map((item) => {
      if (item.type == 'input') {
        totalInput.push(Number(item.value));
      }
    });
    this.collection.map((item) => {
      if (item.type == 'output') {
        totalOutput.push(Number(item.value));
      }
    });

    this.income = totalInput.reduce(
      (total, currentElement) => Number(total) +  Number(currentElement)
    );
    this.cost = totalOutput.reduce(
      (total, currentElement) => Number(total) +  Number(currentElement)
    );
    this.gain = Number(this.income) - Number(this.cost);

  }

  update() {
    this.modal.loading = true;
    this.service.update(this.formModal.value).subscribe(
      (response) => {
        this.modal.loading = false;
        this.modal.isVisible = false;

        this.index();
      },
      (err) => {
        this.modal.loading = false;
      }
    );
  }

  store() {
    this.modal.loading = true;
    // if (this.authenticationService.getFilter()) {
    //   this.formModal.controls['usersId'].setValue(
    //     this.authenticationService.getFilter()
    //   );
    // }

    this.service.store(this.formModal.value).subscribe(
      (response) => {
        this.modal.loading = false;
        this.modal.isVisible = false;
        this.index();
      },
      (err) => {
        this.modal.loading = false;
      }
    );
  }

  delete(id) {
    this.loadingCollection = true;

    this.service.delete(id).subscribe(
      (response) => {
        this.index();
        this.loadingCollection = false;
      },
      (err) => {
        this.loadingCollection = false;
      }
    );
  }

  openModal(data = null) {
    this.resetModal();
    if (data) {
      this.formModal.patchValue(data);
    }
    this.modal.isVisible = true;
  }

  handleModalOk() {
    for (const i in this.formModal.controls) {
      this.formModal.controls[i].markAsDirty();
      this.formModal.controls[i].updateValueAndValidity();
      if (this.formModal.controls[i].invalid) {
        console.log(i);
      }
    }

    if (this.formModal.valid) {
      if (this.formModal.get('id').value !== null) {
        this.update();
      } else {
        this.store();
      }
    }
  }

  handleModalCancel() {
    this.modal.isVisible = false;
  }

  resetModal() {
    this.formModal.reset({
      usersId: this.authenticationService.getFilter(),
    });
  }

  clean() {
    this.filter.type = null;
    this.filter.peoplesId = null;
    this.filter.type = null;
    this.getDateFilter();
    this.index();
  }

  getReportPdfClient(people) {
    this.loadingPDF = true;
    this.appointmentService.getReportPdfClient(people.id).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        saveAs(blob, `${people.name} [dados].pdf`);
        this.loadingPDF = false;
      },
      (err) => {
        this.loadingPDF = false;
      }
    );
  }
}
