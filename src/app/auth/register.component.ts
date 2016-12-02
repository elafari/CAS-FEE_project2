import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { LoggedInUserService } from "./logged-in-user.service";
import { ConfigService } from "../shared/config.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { Registration } from "./user.interface";

@Component({
    templateUrl: './register.component.html',
    styleUrls  : ['../../assets/scss/forms.scss']
})
export class RegisterComponent implements OnInit {
    isDevMode: boolean = ConfigService.devMode;
    registerForm: FormGroup;

    errorMessage: string;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private loggedInUserService: LoggedInUserService,
                private router: Router,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit(): any {
        try {
            this.registerForm = this.fb.group({
                email          : ['', Validators.compose([
                    Validators.required,
                    this.isValidEmail
                ])],
                password       : ['', Validators.compose([
                    Validators.required,
                    this.isValidPassword
                ])],
                confirmPassword: ['', Validators.compose([
                    Validators.required,
                    this.isEqualPassword.bind(this)
                ])]
            });
        } catch (e) {
            this.errorHandler.traceError("[register] - ngOnInit - error", e, true);
        }
    };

    onSubmit() {
        this.onRegister(this.registerForm.value);
    };

    onRegister(key_value: Registration) {
        try {
            this.authService.registerUser(key_value);

            this.loggedInUserService.userData.subscribe((user) => {
                if (user.error != "") {
                    this.errorMessage = user.error;
                } else {
                    this.errorMessage = ConfigService.loginProcessMsg;
                    this.router.navigate(['/patients']);
                }
            });
        } catch (e) {
            this.errorHandler.traceError("[register] - onRegister - error", e, true);
        }
    };

    isValidEmail(control: FormControl): {[s: string]: boolean} {
        if (!control.value.match(ConfigService.getEmailRegex())) {
            return {noValidEmail: true};
        }
    };

    isValidPassword(control: FormControl): {[s: string]: boolean} {
        if (control.value.length < 6) {
            return {noValidPassword: true};
        }
    };

    isEqualPassword(control: FormControl): {[s: string]: boolean} {
        if (!this.registerForm) {
            return {noMatchingPassword: true};
        }
        if (control.value !== this.registerForm.controls['password'].value) {
            return {noMatchingPassword: true};
        }
    };

}
