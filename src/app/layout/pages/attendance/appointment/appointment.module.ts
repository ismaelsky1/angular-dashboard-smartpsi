import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './appointment.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
import { NzModalModule, NzFormModule, NzInputModule, NzSelectModule, NzTimePickerModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    //NgModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzTimePickerModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: AppointmentComponent }])
  ],
  exports: [AppointmentComponent],
  providers: []
})
export class AppointmentModule { }
