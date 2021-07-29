import { AppointmentService } from './../../attendance/appointment/appointment.service';
import { AuthenticationService } from './../../../../services/authentication.service';
import { PeoplesService } from './peoples.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'smartpsi-person',
  templateUrl: './peoples.component.html',
  styleUrls: ['./peoples.component.less'],
})
export class PeoplesComponent implements OnInit {
  formModal: FormGroup;

  modal = { isVisible: false, title: null, loading: false };

  collection: any = [];

  filter = {
    name: null,
    masterId: null,
  };

  token: any;

  loadingCollection: boolean = false;

  uf = [
    {uf: 'AC', name: 'Acre'},
     {uf: 'AL', name: 'Alagoas'},
     {uf: 'AM', name: 'Amazonas'},
     {uf: 'AP', name: 'Amapá'},
     {uf: 'BA', name: 'Bahia'},
     {uf: 'CE', name: 'Ceará'},
     {uf: 'DF', name: 'Distrito Federal'},
     {uf: 'ES', name: 'Espírito Santo'},
     {uf: 'GO', name: 'Goiás'},
     {uf: 'MA', name: 'Maranhão'},
     {uf: 'MT', name: 'Mato Grosso'},
     {uf: 'MS', name: 'Mato Grosso do Sul'},
     {uf: 'MG', name: 'Minas Gerais'},
     {uf: 'PA', name: 'Pará'},
     {uf: 'PB', name: 'Paraíba'},
     {uf: 'PR', name: 'Paraná'},
     {uf: 'PE', name: 'Pernambuco'},
     {uf: 'PI', name: 'Piauí'},
     {uf: 'RJ', name: 'Rio de Janeiro'},
     {uf: 'RN', name: 'Rio Grande do Norte'},
     {uf: 'RS', name: 'Rio Grande do Sul'},
     {uf: 'RO', name: 'Rondônia'},
     {uf: 'RR', name: 'Roraima'},
     {uf: 'SC', name: 'Santa Catarina'},
     {uf: 'SP', name: 'São Paulo'},
     {uf: 'SE', name: 'Sergipe'},
     {uf: 'TO', name: 'Tocantins'}
  ];

  loadingPDF: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: PeoplesService,
    private authenticationService: AuthenticationService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.token = this.authenticationService.getTokenDecode();

    this.index();

    this.formModal = this.formBuilder.group({
      birth_date: null,
      cellphone: null,
      complement: null,
      created_at: null,
      cyte: null,
      document: [null, Validators.required],
      email: null,
      fantasy_name: null,
      father_name: null,
      id: null,
      marital_status: null,
      masterId: [null, Validators.required],
      mother_name: null,
      municipality_registration: null,
      name: [null, Validators.required],
      nationality: null,
      naturalness: null,
      neighborhood: null,
      number: null,
      profession: null,
      public_place: null,
      razao_social: null,
      rg: null,
      rg_data_expedicao: null,
      rg_orgao: null,
      sexo: [false, Validators.required],
      state_subscription: null,
      telephone: null,
      type_people: [null, Validators.required],
      typeface: 'PATIENT',
      uf: [null, Validators.maxLength(2)],
      updated_at: null,
      zip_code: null,
    });
  }

  index() {
    this.loadingCollection = true;

    const params: any = {};
    if (this.authenticationService.getFilter()) {
      params.masterId = this.authenticationService.getFilter();
    }

    if (this.filter.name) {
      params.name = this.filter.name;
    }

    this.service.index(params).subscribe(
      (response) => {
        this.collection = response;
        this.loadingCollection = false;
      },
      (err) => {
        this.loadingCollection = false;
      }
    );
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
      typeface: 'PATIENT',
      masterId: this.authenticationService.getFilter(),
    });

  }

  clean() {
    this.filter.name = null;
    this.index();
  }

  getReportPdfClient(people) {

    this.loadingPDF = true;
    this.appointmentService.getReportPdfClient(people.id).subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      saveAs(blob, `${people.name} [dados].pdf`);
      this.loadingPDF = false;

    }, err => {
      this.loadingPDF = false;
    });
  }
}
