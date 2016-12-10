import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { AuthService } from "./auth.service";
import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { Login } from "./user.interface";

@Component({
    templateUrl: './login.component.html',
    styleUrls  : ['../../assets/scss/forms.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    isDevMode: boolean = ConfigService.devMode;
    loginForm: FormGroup;
    private subscrUser: Subscription;
    errorMessage: string;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private dataService: DataService,
                private router: Router,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit(): any {
        try {
            this.loginForm = this.fb.group({
                email   : ['', Validators.compose([
                    Validators.required,
                    this.isValidEmail
                ])],
                password: ['', Validators.compose([
                    Validators.required,
                    this.isValidPassword
                ])]
            });
        } catch (e) {
            this.errorHandler.traceError("[login] - ngOnInit - error", e, true);
        }
    };

    onSubmit() {
        this.onLogin(this.loginForm.value);
    };

    onLogin(key_value: Login) {
        try {
            this.authService.resetUserData();
            this.subscrUser = this.authService.user$.subscribe((user) => {
                if (user.error) {
                    this.errorMessage = user.error;
                } else {
                    this.errorMessage = ConfigService.loginProcessMsg;
                    this.router.navigate(['/patients']);
                }
            });

            this.dataService.addSubscripton(this.subscrUser);

            this.authService.loginUser(key_value);
        } catch (e) {
            this.errorHandler.traceError("[login] - onLogin - error", e, true);
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

    ngOnDestroy() {
        if (this.subscrUser) this.subscrUser.unsubscribe();
    };
}
