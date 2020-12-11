import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './tutorial.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzModalModule, NzSwitchModule, NzInputModule, NzDividerModule, NzTableModule, NzFormModule, NzSelectModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [TutorialComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzDescriptionsModule,
    NzLayoutModule,
    NzPageHeaderModule,
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
    RouterModule.forChild([{ path: '', component: TutorialComponent }])
  ],
  exports: [TutorialComponent]
})
export class TutorialModule { }
