import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';
import * as moment from "moment";

import { AuthService } from "../auth/auth.service";
import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { Patient } from "./patients.interface";
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl  : './patients-edit.component.html',
    styleUrls    : ['../../assets/scss/forms.scss', '../../assets/scss/tables.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PatientsEditComponent implements OnInit, OnDestroy {
    isDevMode: boolean = ConfigService.devMode;
    genderConfig: any[] = ConfigService.getGender();
    msgList: any = ConfigService.msgList;
    loggedInUserName: string;
    patientForm: FormGroup;
    patientKey: string;
    patientName: string;

    showModalDialog: string;
    simulateDeletion: boolean;

    subscrUser: Subscription;
    subscrRoute: Subscription;
    subscrUserObj: Subscription;
    subscrPatient: Subscription;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private af: AngularFire,
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
            this.simulateDeletion = this.isDevMode;
            this.subscrUser = this.authService.user$.subscribe(
                (user: UserClass) => {
                    if (user.isLoggedIn()) {
                        /*this.af.auth.subscribe(auth => {
                         if (auth) {*/
                        this.subscrRoute = this.route.params.subscribe(
                            (params: any) => {
                                this.patientKey = params['patientKey'];
                                //this.subscrUserObj = this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
                                this.subscrUserObj = this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + user.key).subscribe((user) => {
                                    this.loggedInUserName = user.name;
                                    this.subscrPatient = this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                                        this.patientName = patient.name;

                                        this.patientForm.setValue({
                                            name     : patient.name,
                                            gender   : patient.gender,
                                            birthdate: moment(patient.birthdate).toDate()
                                        });

                                        this.logger.info("[patients-edit] - ngOnInit - data : " + user.name + ' patient: ' + patient.name);
                                    });
                                    this.dataService.addSubscripton(this.subscrPatient);
                                });
                                this.dataService.addSubscripton(this.subscrUserObj);
                            });
                    } else {
                        this.logger.warn("[patients-edit] - ngOnInit - user: no logged in user");
                        this.router.navigate(['/login']);
                    }
                }
            );
            this.dataService.addSubscripton(this.subscrUser);
        } catch (e) {
            this.errorHandler.traceError("[patients-edit] - ngOnInit - error", e, true);
        }
    };

    updatePatient(key_value: Patient) {
        try {
            this.showModalDialog = "";
            this.dataService.updatePatient(this.patientKey, key_value);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[patients-edit] - updatePatient - error", e, true);
        }
    };

    deletePatient() {
        try {
            if (this.subscrPatient) this.subscrPatient.unsubscribe();
            let simulate = this.simulateDeletion;
            this.showModalDialog = "";
            this.logger.info("[patients-edit] - deletePatient - patient: " + this.patientKey + " - simulation: " + simulate);
            this.dataService.deletePatient(this.patientKey, simulate);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[patients-edit] - deletePatient - error", e, true);
        }
    };

    goBack() {
        this.simulateDeletion = this.isDevMode;
        this.location.back();
    };

    onSubmit() {
        this.updatePatient(this.patientForm.value);
    };

    showDeleteDialog(dialogAttribute) {
        this.simulateDeletion = this.isDevMode;
        this.showModalDialog = dialogAttribute;
    };

    ngOnDestroy() {
        if (this.subscrPatient) this.subscrPatient.unsubscribe();
        if (this.subscrUserObj) this.subscrUserObj.unsubscribe();
        if (this.subscrRoute) this.subscrRoute.unsubscribe();
        if (this.subscrUser) this.subscrUser.unsubscribe();
    }
}


