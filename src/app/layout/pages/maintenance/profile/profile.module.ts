import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';

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
import { SharedModule } from 'src/app/shared.module';
@NgModule({
  declarations: [ProfileComponent],
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
    RouterModule.forChild([{ path: '', component: ProfileComponent }])
  ], exports: [ProfileComponent],
  providers: [NgxImageCompressService]
})
export class ProfileModule { }
