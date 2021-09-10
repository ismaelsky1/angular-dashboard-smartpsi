import { AuthenticationService } from './../../../../services/authentication.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'smartpsi-tutorial',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.less']
})
export class FirstStepComponent implements OnInit {

  collection: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
