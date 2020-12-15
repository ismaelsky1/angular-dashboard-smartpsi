import { AuthenticationService } from './../../../../services/authentication.service';
import { UsersService } from './../../maintenance/users/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoverPasswordService } from 'src/app/services/recover-password.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  public forgotPasswordForm: FormGroup;
  public user: any;
  public alertResponse: string;
  private hash: string;
  public formEnabled: boolean;
  public time: any = 3;

  constructor(
    private formBuilder: FormBuilder,
    private recoverPasswordService: RecoverPasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
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
        this.alertResponse = "Aproveite, tenha um otimo trabalho!";

        this.authenticationService.setToken(response.token);

        const redirect = setInterval(() => {
          this.time = (this.time - 1);
          if (this.time == 0) {
            clearInterval(redirect);
            this.router.navigate(['/profile-welcome']);
          }
        }, 1000);

      }, error => {
        this.alertResponse = error[0];
      });

    }
  }

}
