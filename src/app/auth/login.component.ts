import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";
import { ConfigService } from "../shared/config.service";
import { LoggedInUserService } from "../shared/logged-in-user.service";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  myForm:FormGroup;
  errorMessage: String;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private loggedInUserService: LoggedInUserService,
              private router:Router
  ) {}

  onLogin() {
    this.authService.loginUser(this.myForm.value);

    this.loggedInUserService.userData.subscribe((user) => {
      if (user.error != "" ) {
        this.errorMessage = user.error;
      } else {
        this.errorMessage = ConfigService.loginProcessMsg;
        this.router.navigate(['/patients']);
      }
    });
  };

  ngOnInit():any {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


}
