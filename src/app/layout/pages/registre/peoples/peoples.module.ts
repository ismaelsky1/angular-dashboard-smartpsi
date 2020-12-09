import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeoplesComponent } from './peoples.component';
import { PeoplesRoutingModule } from './peoples-routing.module';

import {
  NzTableModule,
  NzInputModule,
  NzDividerModule,
  NzGridModule,
  NzTransButtonModule,
  NzButtonModule,
  NzSelectModule,
  NzModalModule,
  NzSwitchModule,
} from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';
@NgModule({
  declarations: [PeoplesComponent],
  imports: [
    PeoplesRoutingModule,
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
    NzSwitchModule,
    SharedModule,
  ],
  exports: [PeoplesComponent],
})
export class PeoplesModule {}
