
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IconsProviderModule} from './icons-provider.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';
import {LayoutModule} from './layout/layout.module';
import {RouterModule} from '@angular/router';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDescriptionsModule, NzLayoutModule, NzPageHeaderModule, NzAvatarModule, NzBadgeModule, NzPopoverModule, NzCardModule, NzGridModule, NzListModule, NzButtonModule, NzDropDownModule, NzIconModule } from 'ng-zorro-antd';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IconsProviderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    LayoutModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,

    NzDescriptionsModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzAvatarModule,
    NzBadgeModule,
    NzPopoverModule,
    NzCardModule,
    NzSpaceModule,
    NzGridModule,
    NzListModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
