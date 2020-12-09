import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
      LoginRoutingModule,
      CommonModule,
      SharedModule
    ]
})
export class LoginModule { }
