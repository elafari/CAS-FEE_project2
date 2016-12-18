import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { Subscription } from "rxjs/Rx";

import { AuthService } from "../auth/auth.service";
import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { DiseaseCase } from './diseaseCases.interface';
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl: './diseaseCases-edit.component.html',
    styleUrls  : ['../../assets/scss/forms.scss', '../../assets/scss/tables.scss', '../../assets/scss/toggler.scss']
})
export class DiseaseCasesEditComponent implements OnInit, OnDestroy {
    isDevMode: boolean = ConfigService.devMode;
    msgList: any = ConfigService.msgList;
    diseaseCaseForm: FormGroup;
    diseaseCaseKey: string;
    diseaseCaseName: string;

    patientKey: string;
    patientName: string;

    showModalDialog: string;
    simulateDeletion: boolean;

    subscrUser: Subscription;
    subscrRoute: Subscription;
    subscrPatient: Subscription;
    subscrDiseaseCase: Subscription;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private dataService: DataService,
                private location: Location,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        this.diseaseCaseForm = this.fb.group({
            name     : ['', Validators.required],
            startDate: [{value: '', disabled: true}],
            endDate  : [{value: '', disabled: true}],
            active   : ['', Validators.required]
        });

        try {
            this.simulateDeletion = this.isDevMode;
            this.subscrUser = this.authService.user$.subscribe(
                (user: UserClass) => {
                    if (user.isLoggedIn()) {
                        this.subscrRoute = this.route.params.subscribe(
                            (params: any) => {
                                this.diseaseCaseKey = params['diseaseCaseKey'];
                                this.patientKey = this.route.parent.snapshot.params['patientKey'];
                                this.subscrPatient = this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                                    this.patientName = patient.name;
                                    this.subscrDiseaseCase = this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                                        this.diseaseCaseName = diseaseCase.name;

                                        this.diseaseCaseForm.setValue({
                                            name     : diseaseCase.name,
                                            startDate: this.dataService.toFrontendDateStr(diseaseCase.startDate),
                                            endDate  : this.dataService.toFrontendDateStr(diseaseCase.endDate),
                                            active   : diseaseCase.active
                                        });
                                    });
                                    this.dataService.addSubscripton(this.subscrDiseaseCase);
                                });
                                this.dataService.addSubscripton(this.subscrPatient);
                            });
                    } else {
                        this.logger.warn("[diseaseCases-edit] - ngOnInit - user: no logged in user");
                        this.router.navigate(['/login']);
                    }
                }
            );
            this.dataService.addSubscripton(this.subscrUser);
        } catch (e) {
            this.errorHandler.traceError("[diseaseCases-edit] - ngOnInit - error", e, true);
        }
    };

    onSubmit() {
        this.updateDiseaseCase(this.diseaseCaseForm.value);
    };

    updateDiseaseCase(key_value: DiseaseCase) {
        try {
            this.showModalDialog = "";
            this.dataService.updateDiseaseCase(this.diseaseCaseKey, key_value);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[diseaseCases-edit] - updateDiseaseCase - error", e, true);
        }
    };

    deleteDiseaseCase() {
        try {
            if (this.subscrDiseaseCase) this.subscrDiseaseCase.unsubscribe();
            let simulate = this.simulateDeletion;
            this.showModalDialog = "";
            this.logger.info("[diseaseCases-edit] - deleteDiseaseCase - diseaseCase: " + this.diseaseCaseKey + " - simulation: " + simulate);
            this.dataService.deleteDiseaseCase(this.diseaseCaseKey, simulate);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[diseaseCases-edit] - deleteDiseaseCase - error", e, true);
        }
    };

    showDeleteDialog(dialogAttribute) {
        this.simulateDeletion = this.isDevMode;
        this.showModalDialog = dialogAttribute;
    };

    goBack() {
        this.simulateDeletion = this.isDevMode;
        this.location.back();
    };

    ngOnDestroy() {
        if (this.subscrDiseaseCase) this.subscrDiseaseCase.unsubscribe();
        if (this.subscrPatient) this.subscrPatient.unsubscribe();
        if (this.subscrRoute) this.subscrRoute.unsubscribe();
        if (this.subscrUser) this.subscrUser.unsubscribe();
    }
}
