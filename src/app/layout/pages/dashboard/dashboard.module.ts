import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzPageHeaderModule, NzListModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
      DashboardRoutingModule,
      CommonModule,    
      SharedModule,
      NzPageHeaderModule ,
      NzListModule
    ]
})
export class DashboardModule { }
