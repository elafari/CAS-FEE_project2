import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { Patient } from './patients.interface';
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl  : './patients-create.component.html',
    styleUrls    : ['../../assets/scss/forms.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PatientsCreateComponent implements OnInit, OnDestroy {
    isDevMode: boolean = ConfigService.devMode;
    genderConfig: any[] = ConfigService.getGender();
    patientForm: FormGroup;

    loggedInUserName: string;
    loggedInUserKey: string;

    subscrUserObj: Subscription;

    constructor(private fb: FormBuilder,
                private router: Router,
                private location: Location,
                private authService: AuthService,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        this.patientForm = this.fb.group({
            name     : ['', Validators.required],
            gender   : ['', Validators.required],
            birthdate: ['', Validators.required]
        });

        try {
            this.subscrUserObj = this.authService.user$.subscribe(user => {
                this.loggedInUserKey = user.key;
            });
            this.dataService.addSubscripton(this.subscrUserObj);
        } catch (e) {
            this.errorHandler.traceError("[patients-create] - ngOnInit - error", e, true);
        }
    };

    createPatient(key_value: Patient) {
        try {
            key_value.user = this.loggedInUserKey;
            this.dataService.createPatient(key_value);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[patients-create] - createPatient - error", e, true);
        }
    };

    goBack() {
        this.location.back();
    };

    onSubmit() {
        this.createPatient(this.patientForm.value);
    };

    ngOnDestroy() {
        if (this.subscrUserObj) this.subscrUserObj.unsubscribe();
    };
}