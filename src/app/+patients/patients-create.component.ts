import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
    templateUrl: './patients-create.component.html'
})
export class PatientsCreateComponent implements OnInit {

    loggedInUserName: String;
    loggedInUserKey: String;

    constructor(private router: Router,
                private location: Location,
                private af: AngularFire,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        try {
            this.af.auth.subscribe(auth => {
                if (auth) {
                    this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
                        this.loggedInUserName = user.name;
                        this.loggedInUserKey = user.$key;
                    });
                } else {
                    this.logger.warn("[patients-create] - ngOnInit - user: no logged in user");
                    this.router.navigate(['/']);
                }
            });
        } catch (e) {
            this.errorHandler.traceError("[patients-create] - ngOnInit - error", e, true);
        }
    };

    createPatient(key_value) {
        try {

            // temporarily set params to create new patient in new database
            key_value.sex = "unbekannt";
            key_value.birthdate = "20000908";

            this.dataService.createPatient(key_value);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[patients-create] - createPatient - error", e, true);
        }
    };

    goBack() {
        this.location.back();
    };

    onSubmit(form: NgForm) {
        console.log('it works', form);
    };
}
