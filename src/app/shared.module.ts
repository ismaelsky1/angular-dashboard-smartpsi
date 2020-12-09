import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NzAlertModule,
  NzAvatarModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzDatePickerModule,
  NzDividerModule,
  NzDropDownModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzMessageModule,
  NzModalModule,
  NzPopconfirmModule,
  NzSelectModule,
  NzSkeletonModule,
  NzSwitchModule,
  NzTableModule,
  NzTabsModule,
  NzTagModule,
  NzDrawerModule,
  NzBadgeModule,
  NzNotificationModule
} from 'ng-zorro-antd';
import {NgxMaskModule} from 'ngx-mask';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {IconsProviderModule} from './icons-provider.module';
import {RouterModule} from '@angular/router';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzAlertModule,
    NzMessageModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDividerModule,
    NzDropDownModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzSwitchModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzSkeletonModule,
    NzCardModule,
    NzDatePickerModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    IconsProviderModule,
    NzNotificationModule
  ],
  declarations: [

  ],
  exports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzAlertModule,
    NzMessageModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDividerModule,
    NzDropDownModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzSwitchModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzSkeletonModule,
    NzCardModule,
    NzDatePickerModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    NgxMaskModule,
    RouterModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    IconsProviderModule,
    NzDrawerModule,
    NzBadgeModule,
    NzNotificationModule
  ]
})
export class SharedModule { }
