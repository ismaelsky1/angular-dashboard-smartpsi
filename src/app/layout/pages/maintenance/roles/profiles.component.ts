import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.less']
})
export class ProfilesComponent implements OnInit {
  newModule = false;
  isOkLoading = false;
  formNewModule: FormGroup;
  swinn: boolean;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formNewModule = this.formBuilder.group({
      name: null,
    })
  }

  save(){

  }
  showModal(): void {
    this.newModule = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.newModule = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.newModule = false;
  }

}
