import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
    templateUrl: './diseaseCases-create.component.html',
    styleUrls  : ['../../assets/scss/forms.scss']
})
export class DiseaseCasesCreateComponent implements OnInit, OnDestroy {
    isDevMode: boolean = ConfigService.devMode;
    diseaseCaseForm: FormGroup;
    patientKey: string;

    subscrUser: Subscription;
    subscrRoute: Subscription;
    subscrPatient: Subscription;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private authService: AuthService,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        this.diseaseCaseForm = this.fb.group({
            name     : ['', Validators.required],
            type     : ['', Validators.required],
            startDate: [new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear(), Validators.required]
        });

        try {
            this.subscrUser = this.authService.user$.subscribe(
                (user: UserClass) => {
                    if (user.isLoggedIn()) {
                        this.patientKey = this.route.parent.snapshot.params['patientKey'];
                        this.dataService.addSubscripton(this.subscrPatient);
                    } else {
                        this.logger.warn("[diseaseCases-create] - ngOnInit - user: no logged in user");
                        this.router.navigate(['/login']);
                    }
                }
            );
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
        if (this.subscrUser) this.subscrUser.unsubscribe();
        if (this.subscrPatient) this.subscrPatient.unsubscribe();
        if (this.subscrRoute) this.subscrRoute.unsubscribe();
    };
}
