import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecoverPasswordRoutingModule} from './recover-password-routing.module';
import {RecoverPasswordComponent} from './recover-password.component';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzLayoutModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    RecoverPasswordRoutingModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzCardModule,
    ReactiveFormsModule,
    NzGridModule,
    NzLayoutModule,
    NzAlertModule
  ]
})
export class RecoverPasswordModule { }
