import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnchiridionDetailComponent } from './enchiridion-detail.component';
import { NzPageHeaderModule, NzBreadCrumbModule, NzDescriptionsModule, NzLayoutModule, NzAvatarModule, NzGridModule, NzListModule, NzButtonModule, NzIconModule, NzTableModule, NzDividerModule, NzModalModule, NzFormModule, NzInputModule, NzSwitchModule, NzSelectModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [EnchiridionDetailComponent],
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzDescriptionsModule,
    NzLayoutModule,
    NzAvatarModule,
    NzSpaceModule,
    NzGridModule,
    NzListModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    NzSelectModule,
    NzPageHeaderModule,
    SharedModule,

    CKEditorModule,

    RouterModule.forChild([{ path: '', component: EnchiridionDetailComponent }])
  ],
  exports: [EnchiridionDetailComponent]
})
export class EnchiridionDetailModule { }
