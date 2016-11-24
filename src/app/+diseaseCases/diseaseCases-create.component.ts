import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { DiseaseCase } from './diseaseCases.interface';

@Component({
    templateUrl: './diseaseCases-create.component.html',
    styleUrls  : ['../../assets/scss/forms.scss']
})
export class DiseaseCasesCreateComponent implements OnInit, OnDestroy {
    isDevMode: boolean = ConfigService.devMode;
    diseaseCaseForm: FormGroup;
    patientKey: string;
    patientName: string;

    diseaseCaseKey: string;
    diseaseCaseName: string;

    subscrRoute: Subscription;
    subscrPatient: Subscription;
    subscrDiseaseCase: Subscription;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private af: AngularFire,
                private location: Location,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        this.diseaseCaseForm = this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
        });

        try {
            this.af.auth.subscribe(auth => {
                if (auth) {
                    this.subscrRoute = this.route.params.subscribe(
                        (params: any) => {
                            this.diseaseCaseKey = params['diseaseCaseKey'];
                            this.patientKey = this.route.parent.snapshot.params['patientKey'];
                            this.subscrPatient = this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                                this.patientName = patient.name;
                                this.subscrDiseaseCase = this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                                    this.diseaseCaseName = diseaseCase.name;
                                });
                                this.dataService.addSubscripton(this.subscrDiseaseCase);
                            });
                            this.dataService.addSubscripton(this.subscrPatient);
                        });
                } else {
                    this.logger.warn("[diseaseCases-create] - ngOnInit - user: no logged in user");
                    this.router.navigate(['/login']);
                }
            });
        } catch (e) {
            this.errorHandler.traceError("[diseaseCases-create] - ngOnInit - error", e, true);
        }
    };

    onSubmit() {
        this.createDiseaseCase(this.diseaseCaseForm.value);
    };

    createDiseaseCase(key_value: DiseaseCase) {
        try {
            key_value.patient = this.patientKey;
            key_value.active = true;
            this.dataService.createDiseaseCase(key_value);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[diseaseCases-create] - createDiseaseCase - error", e, true);
        }
    };

    goBack() {
        this.location.back();
    };

    ngOnDestroy() {
        if (this.subscrDiseaseCase) {
            this.subscrDiseaseCase.unsubscribe();
        }
        if (this.subscrPatient) {
            this.subscrPatient.unsubscribe();
        }
        if (this.subscrRoute) {
            this.subscrRoute.unsubscribe();
        }
    };
}
