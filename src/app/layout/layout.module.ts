import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {SingleLayoutComponent} from './single-layout/single-layout.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {NZ_I18N, pt_BR} from 'ng-zorro-antd';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '../helpers/jwt.interceptor';
import {ErrorInterceptor} from '../helpers/error.interceptor';
import pt from '@angular/common/locales/pt';
import {SharedModule} from '../shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

registerLocaleData(pt);

@NgModule({
  declarations: [
    MainLayoutComponent,
    SingleLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutRoutingModule,
  ],
  providers: [
    {provide: NZ_I18N, useValue: pt_BR},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LayoutModule { }
