import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';



@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: NotificationComponent }])
  ],
  exports: [NotificationComponent]
})
export class NotificationModule { }
