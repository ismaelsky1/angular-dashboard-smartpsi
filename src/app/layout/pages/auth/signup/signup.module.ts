import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignUpComponent } from './signup.component';
import { SignUpRoutingModule } from './signup-routing.module';
import { SharedModule } from '../../../../shared.module';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    SignUpRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class SignUpModule { }
