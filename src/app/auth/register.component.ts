import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";
import { ConfigService } from "../shared/config.service";
import { LoggedInUserService } from "../shared/logged-in-user.service";

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    myForm: FormGroup;

    errorMessage: String;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private loggedInUserService: LoggedInUserService,
                private router: Router) {}

    onRegister() {
      this.authService.registerUser(this.myForm.value);

      this.loggedInUserService.userData.subscribe((user) => {
        if (user.error != "" ) {
          this.errorMessage = user.error;
        } else {
          this.errorMessage = ConfigService.loginProcessMsg;
          this.router.navigate(['/patients']);
        }
      });
    }

    ngOnInit(): any {
        this.myForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],
        });
    }

    isEmail(control: FormControl): {[s: string]: boolean} {
        if (!control.value.match(ConfigService.getEmailRegex())) {
            return {noEmail: true};
        }
    }

    isEqualPassword(control: FormControl): {[s: string]: boolean} {
        if (!this.myForm) {
            return {passwordsNotMatch: true};

        }
        if (control.value !== this.myForm.controls['password'].value) {
            return {passwordsNotMatch: true};
        }
    }
}
