import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";

import { AngularFire } from 'angularfire2';
import { AuthService } from "../auth/auth.service";
import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { Patient } from './patients.interface';
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl: './patients-create.component.html',
    styleUrls  : ['../../assets/scss/forms.scss']
})
export class PatientsCreateComponent implements OnInit, OnDestroy {
    isDevMode:boolean = ConfigService.devMode;
    genderConfig:any[] = ConfigService.getGender();
    patientForm:FormGroup;

    loggedInUserName:string;
    loggedInUserKey:string;

    subscrUser:Subscription;
    subscrUserObj:Subscription;

    constructor(private fb:FormBuilder,
                private router:Router,
                private location:Location,
                private af: AngularFire,
                private authService:AuthService,
                private dataService:DataService,
                private errorHandler:ErrorHandlerService,
                private logger:LoggerService) {
    };

    ngOnInit() {
        this.patientForm = this.fb.group({
            name     : ['', Validators.required],
            gender   : ['', Validators.required],
            birthdate: ['', Validators.required]
        });

        try {
            this.subscrUser = this.authService.user$.subscribe(
                (user:UserClass) => {
                    if (user.isLoggedIn()) {
                        /*this.af.auth.subscribe(auth => {
                         if (auth) {*/
                        //this.subscrUserObj = this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
                        this.subscrUserObj = this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + user.key).subscribe((user) => {
                            this.loggedInUserName = user.name;
                            this.loggedInUserKey = user.$key;
                        });
                        this.dataService.addSubscripton(this.subscrUserObj);
                    } else {
                        this.logger.warn("[patients-create] - ngOnInit - user: no logged in user");
                        this.router.navigate(['/login']);
                    }
                }
            );
            this.dataService.addSubscripton(this.subscrUser);
        } catch (e) {
            this.errorHandler.traceError("[patients-create] - ngOnInit - error", e, true);
        }
    };

    createPatient(key_value:Patient) {
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
        if (this.subscrUser) this.subscrUser.unsubscribe();
    };
}