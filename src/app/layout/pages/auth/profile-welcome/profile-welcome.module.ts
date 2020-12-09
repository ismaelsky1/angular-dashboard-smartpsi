import { SharedModule } from './../../../../shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileWelcomeComponent } from './profile-welcome.component';

import {
  NzSpinModule,
  NzCardModule,
  NzTableModule,
  NzInputModule,
  NzDividerModule,
  NzGridModule,
  NzTransButtonModule,
  NzButtonModule,
  NzSelectModule,
  NzModalModule,
  NzSwitchModule,
  NzAlertModule,
  NzNotificationModule,
  NzFormModule } from 'ng-zorro-antd';
import {NgxImageCompressService} from 'ngx-image-compress';
@NgModule({
  declarations: [ProfileWelcomeComponent],
  imports: [
    NzSpinModule,
    NzCardModule,
    NzAlertModule,
    CommonModule,
    NzTableModule,
    NzInputModule,
    NzDividerModule,
    NzGridModule,
    NzTransButtonModule,
    NzButtonModule,
    NzSelectModule,
    NzModalModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzSwitchModule,
    NzNotificationModule ,
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProfileWelcomeComponent }])
  ], exports: [ProfileWelcomeComponent],
  providers: [NgxImageCompressService]
})
export class ProfileWelcomeModule { }
