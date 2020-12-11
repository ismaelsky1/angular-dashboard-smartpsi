import { AuthenticationService } from './../../../../services/authentication.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'smartpsi-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.less']
})
export class TutorialComponent implements OnInit {

  collection: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
