import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../maintenance/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public signUpForm: FormGroup;
  public signInForm: FormGroup;
  public alertError: string;

  public signMode: string = 'signIn';
  public loadingSign = false;
  public successSignUp: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      if (res.alertError) {
        this.alertError = res.alertError;
      }
    });

    this.signUpForm = this.formBuilder.group({
      //fantasy_name: [null, Validators.required],
      full_name: [null, Validators.required],
      email: [null, Validators.required],
      // password: [null, Validators.required],
      // check_password: [null, Validators.required],
      status: ['approved', Validators.required],
      role: ['USER', Validators.required]
    });

    this.signInForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });

  }

  signChange(flag: string) {
    this.signMode = flag;
    this.alertError = null;
    this.successSignUp = false;
  }

  handledSignIn() {
    // tslint:disable-next-line: forin
    for (const i in this.signInForm.controls) {
      this.signInForm.controls[i].markAsDirty();
      this.signInForm.controls[i].updateValueAndValidity();
    }

    if (this.signInForm.valid) {
      this.loadingSign = true;
      this.authenticationService.login(this.signInForm.value).subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.alertError = error;
          this.loadingSign = false;

        });
    }
  }

  handledSignUp() {
    // tslint:disable-next-line: forin
    for (const i in this.signUpForm.controls) {
      this.signUpForm.controls[i].markAsDirty();
      this.signUpForm.controls[i].updateValueAndValidity();
    }

    // if(this.signUpForm.controls.check_password.value !== this.signUpForm.controls.password.value){
    //   this.signUpForm.controls.check_password.setErrors({'incorrect': true});
    // }

    if (this.signUpForm.valid) {
      this.loadingSign = true;

      this.usersService.store(this.signUpForm.value).subscribe(
        response => {
          this.alertError = 'Sua conta na Smartpsi está quase pronta. Para ativá-la, enviamos um email para ' + response.email + '.';
          this.successSignUp = true;
          this.loadingSign = false;
        },
        (error) => {
          this.loadingSign = false;

          this.alertError = error[0];
        });
    }
  }
}
