import { UsersService } from '../../maintenance/users/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  public signUp: FormGroup;
  public alertError: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.signUp = this.formBuilder.group({
      fantasy_name: [null, Validators.required],
      full_name: [null, Validators.required],
      email: [null, Validators.required],
      //password: [null, Validators.required],
      status: ['approved', Validators.required],
      role: ['USER', Validators.required],
    });
  }

  submitForm() {

    // tslint:disable-next-line: forin
    for (const i in this.signUp.controls) {
      this.signUp.controls[i].markAsDirty();
      this.signUp.controls[i].updateValueAndValidity();
    }

    if (this.signUp.valid) {
      this.usersService.store(this.signUp.value).subscribe(
        response => {
          console.log(response)
          this.alertError = 'Usuário criado, enviamos um email para ' + response.email;
        },
        (error) => {
          this.alertError = error[0];
        });
    }
  }
}
