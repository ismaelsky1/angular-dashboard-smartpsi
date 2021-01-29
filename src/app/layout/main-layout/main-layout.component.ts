import { environment } from './../../../environments/environment';
import { UsersService } from './../pages/maintenance/users/users.service';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChangePasswordService } from "../../services/change-password.service";
import { NzNotificationService } from "ng-zorro-antd";
import { MenuService } from 'src/app/services/menu.service';
import { format, compareAsc, differenceInDays } from 'date-fns';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  public innerWidth: any;


  public modalPassword = { isVisibled: false, loading: false };
  public isCollapsed: boolean;
  public userToken: any = {};
  public menu: any[];

  public formModalPassword: FormGroup;

  public userSession: any = {};
  public urlApi = environment.files;

  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
    sub3: false
  };

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private changePasswordService: ChangePasswordService,
    private notification: NzNotificationService,
    private menuService: MenuService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.userToken = this.authenticationService.getTokenDecode();
    this.loadUser();
    this.formModalPassword = this.formBuilder.group({
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });

    this.getMenu();
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  getMenu() {
    this.menuService.index().subscribe(response => {
      this.menu = response;
    });
  };

  loadUser() {
    this.usersService.show(this.userToken.sub).subscribe(response => {
      this.userSession = response;


      if (this.userSession.role == 'FREE' && this.userSession.created_at) {

        const dat1 = new Date(this.userSession.created_at);
        const dat2 = new Date();
        const diff = differenceInDays(dat2, dat1);

        if (diff > 15) {
          document.location.href = 'https://smartpsi.com.br/#buy-tickets';
        }
      }

    });
  };

  logout() {
    this.authenticationService.logout();
  }

  openModalPassword() {
    this.modalPassword.isVisibled = true;
    this.formModalPassword.reset();
  }

  closeModalPassword() {
    this.modalPassword.isVisibled = false;
  }

  changePassword() {
    this.modalPassword.loading = true;
    this.changePasswordService.changePassword(this.formModalPassword.value).subscribe(response => {
      this.notification.create(
        'success',
        'Sucesso',
        'Senha alterada com sucesso'
      );
      this.modalPassword.loading = false;
      this.modalPassword.isVisibled = false;
    }, err => {
      this.modalPassword.loading = false;

    });
  }

  viewNotification() {
    return 'a';
  }

  collapsedMobile() {
    console.log(this.innerWidth)
    if (this.innerWidth < 500) {
      this.isCollapsed = true;
    }
  }

}
