import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';


import { NzTableModule, NzInputModule, NzDividerModule, NzGridModule, NzTransButtonModule, NzButtonModule, NzSelectModule, NzModalModule, NzSwitchModule, NzFormModule, NzNotificationModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
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
    RouterModule.forChild([{ path: '', component: UsersComponent }])
  ], exports: [UsersComponent]
})
export class UsersModule { }
