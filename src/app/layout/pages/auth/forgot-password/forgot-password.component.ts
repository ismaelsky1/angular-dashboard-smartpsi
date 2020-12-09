import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoverPasswordService } from '../../../../services/recover-password.service';
// import {User} from '../maintenance/users/users.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  public forgotPasswordForm: FormGroup;
  public user: any;// User;
  public alertResponse: string;
  private hash: string;
  public formEnabled: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private recoverPasswordService: RecoverPasswordService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      hashRecover: [null, Validators.required],
      id: [null, Validators.required],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });


    this.route.queryParams.subscribe(response => {
      this.forgotPasswordForm.patchValue(response);
    });
  }

  submitForm() {// tslint:disable-next-line: forin
    for (const i in this.forgotPasswordForm.controls) {
      this.forgotPasswordForm.controls[i].markAsDirty();
      this.forgotPasswordForm.controls[i].updateValueAndValidity();
      if (this.forgotPasswordForm.controls[i].invalid) {
        console.log(i);
      }
    }

    if (this.forgotPasswordForm.value.new_password !== this.forgotPasswordForm.value.confirm_password) {
      this.forgotPasswordForm.controls.confirm_password.setErrors({ 'incorrect': true });
    }

    if (this.forgotPasswordForm.valid) {

      this.recoverPasswordService.redefinePassword(this.forgotPasswordForm.value).subscribe(response => {
        this.alertResponse = response.messagem;
      }, error => {
        this.alertResponse = error[0];
      });

    }
  }

}
