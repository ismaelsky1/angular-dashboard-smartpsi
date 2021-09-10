import { AuthenticationService } from './../../../../services/authentication.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'smartpsi-personalized-config',
  templateUrl: './personalized-config.component.html',
  styleUrls: ['./personalized-config.component.less']
})
export class PersonalizedConfigComponent implements OnInit {

  collection: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
