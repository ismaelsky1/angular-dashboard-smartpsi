import { AuthenticationService } from './../../../../services/authentication.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PeoplesService } from '../../registre/peoples/peoples.service';

@Component({
  selector: 'smartpsi-enchiridion',
  templateUrl: './enchiridion.component.html',
  styleUrls: ['./enchiridion.component.less']
})
export class EnchiridionComponent implements OnInit {

  filter: any = {
    peoples: null
  };


  collection: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private peoplesService: PeoplesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.index();
  }

  index() {
    const params: any = {};

    if (this.authenticationService.getFilter()) {
      params.masterId = this.authenticationService.getFilter();
    }

    this.peoplesService.index(params).subscribe(response => {
      this.collection = response;
    });
  }

  searchPeoples(name){
    const params: any = {};

    if(name){
      params.name = name
    }
    if (this.authenticationService.getFilter()) {
      params.masterId = this.authenticationService.getFilter();
    }

    this.peoplesService.index(params).subscribe(response => {
      this.collection = response;
    });
  }

  open() {

  }

}
