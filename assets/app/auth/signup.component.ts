import { Component, OnInit } from "@angular/core";
import { FormBuilder, ControlGroup, Validators, Control } from "@angular/common";

import { User } from "./user";
import { AuthService } from "./auth.service";
import { ErrorService } from "../errors/error.service";
@Component({
  selector: 'my-signup',
  templateUrl: 'app/auth/views/signup.html'
})
export class SignupComponent implements OnInit {
  myForm: ControlGroup;

  constructor(private _fb:FormBuilder, private _authService: AuthService, private _errorService: ErrorService) {}

  onSubmit() {
    const user = new User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
    console.log(user);
    this._authService.signup(user)
    .subscribe(
      data => console.log(data),
      error => this._errorService.handleError(error)
      )
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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