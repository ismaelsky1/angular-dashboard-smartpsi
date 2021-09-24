import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance.component';
import { FinanceRoutingModule } from './finance-routing.module';

import {
  NzTableModule,
  NzTypographyModule,
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
import { SharedModule } from '../../../../shared.module';
@NgModule({
  declarations: [FinanceComponent],
  imports: [
    FinanceRoutingModule,
    CommonModule,
    NzTableModule,
    NzInputModule,
    NzDividerModule,
    NzGridModule,
    NzTransButtonModule,
    NzButtonModule,
    NzSelectModule,
    NzModalModule,
    NzTypographyModule,
    ReactiveFormsModule,
    FormsModule,
    NzSwitchModule,
    SharedModule,
  ],
  exports: [FinanceComponent],
})
export class FinanceModule {}
