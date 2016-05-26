import { Component, OnInit } from "@angular/core";
import { ControlGroup, FormBuilder, Validators, Control } from "@angular/common";
import { Router } from "@angular/router";

import { User } from "./user";
import { AuthService } from "./auth.service";
import { ErrorService } from "../errors/error.service";
@Component({
  selector: 'my-signin',
  templateUrl: 'app/auth/views/signin.html'
})
export class SigninComponent implements OnInit {
  myForm: ControlGroup;

  constructor(private _fb:FormBuilder, private _authService: AuthService, private _router: Router, private _errorService: ErrorService) {}

  onSubmit() {
    const user = new User(this.myForm.value.email, this.myForm.value.password);
    this._authService.signin(user)
    .subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this._router.navigateByUrl('/');
      },
      error => this._errorService.handleError(error)
      );
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
        ])],
      password: ['', Validators.required]
    });
  }

  private isEmail(control: Control): {[s: string]: boolean} {
    if (!control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
      return {invalidMail: true};
    }
  }
}