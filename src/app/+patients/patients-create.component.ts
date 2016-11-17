import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { Patient } from './patients.interface';

@Component({
    templateUrl: './patients-create.component.html',
    styleUrls  : ['../../assets/scss/forms.scss']
})
export class PatientsCreateComponent implements OnInit, OnDestroy {
    isDevMode: boolean = ConfigService.devMode;
    sexConfig: any[] = ConfigService.getSex();
    patient: FormGroup;

    loggedInUserName: string;
    loggedInUserKey: string;

    subscrUser: Subscription;

    constructor(private router: Router,
                private location: Location,
                private af: AngularFire,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        this.patient = new FormGroup({
            name     : new FormControl('', Validators.required),
            sex      : new FormControl('', Validators.required),
            birthdate: new FormControl('', Validators.required)
        });

        try {
            this.af.auth.subscribe(auth => {
                if (auth) {
                    this.subscrUser = this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
                        this.loggedInUserName = user.name;
                        this.loggedInUserKey = user.$key;
                    });
                    this.dataService.addSubscripton(this.subscrUser);
                } else {
                    this.logger.warn("[patients-create] - ngOnInit - user: no logged in user");
                    this.router.navigate(['/login']);
                }
            });
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
        this.createPatient(this.patient.value);
    };

    ngOnDestroy() {
        if (this.subscrUser) {
            this.subscrUser.unsubscribe();
        }
    };
}