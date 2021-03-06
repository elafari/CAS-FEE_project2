import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { Subscription } from "rxjs/Rx";

import * as moment from "moment";

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { DiseaseCase } from './diseaseCases.interface';
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl  : './diseaseCases-create.component.html',
    styleUrls    : ['../../assets/scss/forms.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DiseaseCasesCreateComponent implements OnInit, OnDestroy {
    isDevMode: boolean = ConfigService.devMode;
    diseaseCaseForm: FormGroup;
    patientKey: string;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        this.diseaseCaseForm = this.fb.group({
            name     : ['', Validators.required],
            startDate: [moment().toDate(), Validators.required]
        });

        try {
            this.patientKey = this.route.parent.snapshot.params['patientKey'];
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
            this.dataService.createDiseaseCase(key_value).then(
                () => this.logger.info("[diseaseCases-create] - createDiseaseCase - new case successfully created"),
                (e) => this.errorHandler.traceError("[diseaseCases-create] - createDiseaseCase - error", e, true));
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[diseaseCases-create] - createDiseaseCase - error", e, true);
        }
    };

    goBack() {
        this.location.back();
    };

    ngOnDestroy() {

    };
}
