import { AuthenticationService } from './../../../../services/authentication.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'smartpsi-enchiridion',
  templateUrl: './enchiridion.component.html',
  styleUrls: ['./enchiridion.component.less']
})
export class EnchiridionComponent implements OnInit {

  collection: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
