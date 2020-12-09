import { AuthenticationService } from './../../../../services/authentication.service';
import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'smartpsi-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  formModal: FormGroup;

  modal: any = { isVisible: false, title: null, loading: false };

  public filters: any = {};

  collections: any[];

  public userToken: any;
  isActiveSwitch = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.index();

    this.userToken = this.authenticationService.getTokenDecode();

    this.formModal = this.formBuilder.group({
      id: null,
      full_name: [null, Validators.required],
      email: [null, Validators.required],
      phoneMovel: null,

      role: [null, Validators.required],
      confirmMail: true,
      active: true,
      password: null,

      masterId: null,
      avatar: null,
      hashRecover: null,
      subscribersId: null,
    });
  }

  index() {
    const params: any = {};

    if (this.authenticationService.getFilter()) {
      params.masterId = this.authenticationService.getFilter();
    }

    if (this.filters.full_name) {
      params.full_name = this.filters.full_name;
    }
    if (this.filters.role) {
      params.role = this.filters.role;
    }
    if (this.filters.active !== undefined) {
      params.active = this.filters.active;
    }

    this.usersService.index(params).subscribe(response => {
      this.collections = response;
    });
  }

  handleOpenModal(data = null) {
    this.resetModal();
    if (data) {
      this.formModal.patchValue(data);
    }
    this.modal.isVisible = true;
  }

  handleModalOk() {
    // tslint:disable-next-line: forin
    for (const i in this.formModal.controls) {
      this.formModal.controls[i].markAsDirty();
      this.formModal.controls[i].updateValueAndValidity();
      if (this.formModal.controls[i].invalid) {
        console.log(i);
      }
    }

    if (this.formModal.valid) {
      if (this.formModal.value.id) {
        this.update();
      } else {
        this.store();
      }
    }
  }

  changeActive(item: any) {
    this.isActiveSwitch = true;

    this.usersService
      .update({
        id: item.id,
        active: item.active,
      })
      .subscribe((response) => {
        this.isActiveSwitch = false;
        this.index();
      });
  }

  update() {
    this.modal.loading = true;
    this.usersService.update(this.formModal.value).subscribe(response => {
      this.modal.loading = false;
      this.index();
      this.handleModalCancel();

      this.notification.create(
        'success',
        'Registrado com Sucesso!',
        ''
      );

    }, err => {
      this.modal.loading = false;
    });
  }

  store() {
    this.modal.loading = true;

    this.usersService.store(this.formModal.value).subscribe(response => {
      this.modal.loading = false;
      this.index();
      this.handleModalCancel();
      this.notification.create(
        'success',
        'Registrado com Sucesso!',
        'Usuário criado'
      );



    }, err => {
      this.modal.loading = false;
    });
  }

  handleDelete(id: string){
    this.modal.loading = true;

    this.usersService.delete(id).subscribe(response => {
      this.modal.loading = false;
      this.index();
      this.handleModalCancel();
      this.notification.create(
        'success',
        'Registrado com Removido!',
        'Usuário Excluido'
      );

    }, err => {
      this.modal.loading = false;
    });
  }

  handleModalCancel() {
    this.modal.isVisible = false;
  }

  resetModal() {
    this.formModal.reset();
  }

  resetFilter() {
    this.filters = {};
    this.index();
  }

}
