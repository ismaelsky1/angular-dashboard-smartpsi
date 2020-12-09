import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoverPasswordService } from '../../../../services/recover-password.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  public recoverPasswordForm: FormGroup;
  public alertSuccess: string;

  constructor(
    private formBuilder: FormBuilder,
    private recoverPasswordService: RecoverPasswordService
  ) { }

  ngOnInit() {
    this.recoverPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required]]
    });
  }

  submitForm() {

    // tslint:disable-next-line: forin
    for (const i in this.recoverPasswordForm.controls) {
      this.recoverPasswordForm.controls[i].markAsDirty();
      this.recoverPasswordForm.controls[i].updateValueAndValidity();
    }

    if (this.recoverPasswordForm.valid) {
      this.recoverPasswordService.recoverPassword(this.recoverPasswordForm.value.email).subscribe(response => {
        this.alertSuccess = `Enviamos um link de recuperação para o email: ${this.recoverPasswordForm.value.email}`;
      }, err => {
        this.alertSuccess = null;
      });
    }

  }

}
