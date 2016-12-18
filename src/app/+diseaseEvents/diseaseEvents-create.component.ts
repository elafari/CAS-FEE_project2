import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { Subscription } from "rxjs/Rx";
import * as moment from "moment";

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { DiseaseEvent } from './diseaseEvents.interface';
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl  : './diseaseEvents-create.component.html',
    styleUrls    : ['../../assets/scss/forms.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DiseaseEventsCreateComponent implements OnInit, OnDestroy {
    isDevMode: boolean = ConfigService.devMode;
    eventTypeConfig: any[] = ConfigService.getEventType();
    diseaseEventForm: FormGroup;
    diseaseCaseKey: string;
    diseaseCaseName: string;

    diseaseEventKey: string;
    diseaseEventName: string;

    subscrRoute: Subscription;
    subscrDiseaseCase: Subscription;
    subscrDiseaseEvent: Subscription;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService) {
    };

    ngOnInit() {
        this.diseaseEventForm = this.fb.group({
            type    : ['', Validators.required],
            value   : ['', Validators.required],
            dateTime: [moment().toDate(), Validators.required]
        });

        try {
                        this.subscrRoute = this.route.params.subscribe(
                            (params: any) => {
                                this.diseaseEventKey = params['diseaseEventKey'];
                                this.diseaseCaseKey = this.route.parent.snapshot.params['diseaseCaseKey'];
                                this.subscrDiseaseCase = this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                                    this.diseaseCaseName = diseaseCase.name;
                                    this.subscrDiseaseEvent = this.dataService.getDiseaseEvent(this.diseaseEventKey).subscribe((diseaseEvent) => {
                                        this.diseaseEventName = diseaseEvent.name;
                                    });
                                    this.dataService.addSubscripton(this.subscrDiseaseEvent);
                                });
                                this.dataService.addSubscripton(this.subscrDiseaseCase);
                            });

        } catch (e) {
            this.errorHandler.traceError("[diseaseEvents-create] - ngOnInit - error", e, true);
        }
    };

    onSubmit() {
        this.createDiseaseEvent(this.diseaseEventForm.value);
    };

    createDiseaseEvent(key_value: DiseaseEvent) {
        try {
            key_value.caseKey = this.diseaseCaseKey;
            this.dataService.createDiseaseEvent(key_value);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[diseaseEvents-create] - createDiseaseEvent - error", e, true);
        }
    };

    goBack() {
        this.location.back();
    };

    ngOnDestroy() {
        if (this.subscrDiseaseEvent) this.subscrDiseaseEvent.unsubscribe();
        if (this.subscrDiseaseCase) this.subscrDiseaseCase.unsubscribe();
        if (this.subscrRoute) this.subscrRoute.unsubscribe();
    };
}
