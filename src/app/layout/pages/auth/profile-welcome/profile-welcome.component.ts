import { Router } from '@angular/router';
import { SubscribersService } from './../../maintenance/profile/subscribers.service';
import { UsersService } from './../../maintenance/users/users.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { environment } from './../../../../../environments/environment';
import { AuthenticationService } from './../../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Location } from '@angular/common';

@Component({
  selector: 'smartpsi-profile',
  templateUrl: './profile-welcome.component.html',
  styleUrls: ['./profile-welcome.component.less'],
})
export class ProfileWelcomeComponent implements OnInit {
  formUser: FormGroup;
  formSubscriber: FormGroup;

  modal: any = { isVisible: false, title: null };

  urlApi: any = environment.files;

  user: any;
  subscribers: any;

  isLoadAvatar = false;
  updateUserLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private subscribersService: SubscribersService,
    private authenticationService: AuthenticationService,
    private ngxImageCompressService: NgxImageCompressService,
    private nzNotificationService: NzNotificationService,
    private location: Location,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      id: null,
      full_name: [null, Validators.required],
      phoneMovel: null,
      email: new FormControl({ value: null, disabled: true }),
      role: new FormControl(
        { value: 'ROOT', disabled: true },
        Validators.required
      ),
      confirmMail: true,
      active: true,
      password: null,

      masterId: null,
      avatar: null,
      hashRecover: null,
      subscribersId: null,
    });

    this.formSubscriber = this.formBuilder.group({
      id: null,
      fantasy_name: null,
      razao_social: null,
      document: null,
      status: null,
      state_subscription: null,
      municipality_registration: null,
      cellphone: null,
      telephone: null,
      code: null,
      address: null,
      district: null,
      state: null,
      city: null,
      number: null,
    });
    this.show();
  }

  show() {
    const token = this.authenticationService.getTokenDecode();
    this.usersService.show(token.sub).subscribe((response) => {
      console.log(response)
      if (!response.subscribers) {
        response.subscribers = {};
      }
      this.formUser.patchValue(response);
      this.formSubscriber.patchValue(response.subscribers);
    });
  }

  handleChangeAvatar(data) {
    this.isLoadAvatar = true;
    const file = (data.target as HTMLInputElement).files[0];

    if (!file) {
      this.isLoadAvatar = false;
      return false;
    }

    if (file.size > 2000000) {
      this.nzNotificationService.error(
        'Ops...',
        'A imagem deve ser menor que 2mb'
      );
      this.isLoadAvatar = false;
      return false;
    }

    if (file.type.indexOf('image/') !== 0) {
      this.nzNotificationService.error('Ops...', 'Arquivo não é imagem');
      this.isLoadAvatar = false;
      return false;
    }

    this.usersService.avatar({ avatar: file }).subscribe(
      (response) => {
        this.location.prepareExternalUrl('');
        this.show();
        this.isLoadAvatar = false;
      },
      (err) => {
        this.isLoadAvatar = false;
      }
    );
  }

  openModal(data = null) {
    this.resetModal();
    if (data) {
      this.formUser.patchValue(data);
    }
    this.modal.isVisible = true;
  }

  handleUpdate() {
    // tslint:disable-next-line: forin
    for (const i in this.formUser.controls) {
      this.formUser.controls[i].markAsDirty();
      this.formUser.controls[i].updateValueAndValidity();
    }

    // tslint:disable-next-line: forin
    for (const i in this.formSubscriber.controls) {
      this.formSubscriber.controls[i].markAsDirty();
      this.formSubscriber.controls[i].updateValueAndValidity();
    }

    if (this.formUser.valid && this.formSubscriber.valid) {
      this.update();
    }
  }

  update() {
    this.updateUserLoaded = true;
    this.usersService.update(this.formUser.value).subscribe(
      (response) => {
        this.updateSubscribers();
      },
      (err) => {
        this.updateUserLoaded = false;
      }
    );
  }

  updateSubscribers() {
    this.updateUserLoaded = true;

    this.subscribersService.update(this.formSubscriber.value).subscribe(
      (response) => {

        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.updateUserLoaded = false;
      }
    );
  }

  handleModalCancel() {
    this.modal.isVisible = false;
  }

  resetModal() {
    this.formUser.reset();
  }
}
