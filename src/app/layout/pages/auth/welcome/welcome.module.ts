import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeRoutingModule} from './welcome-routing.module';
import {WelcomeComponent} from './welcome.component';
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
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
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
export class WelcomeModule { }
