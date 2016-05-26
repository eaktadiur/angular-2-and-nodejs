import { Component } from "@angular/core";
import { Routes, ROUTER_DIRECTIVES } from "@angular/router";

import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";
import { AuthService } from "./auth.service";
@Component({
  selector: 'my-auth',
  templateUrl: 'app/auth/views/header.html',
  directives: [ROUTER_DIRECTIVES],
  styles: [`
  .router-link-active {
    color: #555;
    cursor: default;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-color: transparent;
  }
  `]
})
@Routes([
  {path: '/signup', component: SignupComponent},
  {path: '/signin', component: SigninComponent},
  {path: '/logout', component: LogoutComponent}
  ])
export class AuthenticationComponent {
  constructor (private _authService: AuthService) {}

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

}