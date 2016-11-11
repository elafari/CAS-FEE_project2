import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { ConfigService } from "../shared/config.service";
import { LoggedInUserService } from "./logged-in-user.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  myForm:FormGroup;
  errorMessage: String;

  constructor(private fb:FormBuilder,
              private router:Router,
              private authService:AuthService,
              private loggedInUserService: LoggedInUserService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService) {

  };

  ngOnInit():any {
    try {
      this.myForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    } catch(e) {
      this.errorHandler.traceError("[login] - ngOnInit - error", e, true);
    }
  };

  onLogin() {
    try {
      this.authService.loginUser(this.myForm.value);

      this.loggedInUserService.userData.subscribe((user) => {
        if (user.error != "") {
          this.errorMessage = user.error;
        } else {
          this.errorMessage = ConfigService.loginProcessMsg;
          this.router.navigate(['/patients']);
        }
      });
    } catch(e) {
      this.errorHandler.traceError("[login] - onLogin - error", e, true);
    }
  };
}
