import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { DiseaseEvent } from './diseaseEvents.interface';

@Component({
    templateUrl: './diseaseEvents-create.component.html',
    styleUrls  : ['../../assets/scss/forms.scss']
})
export class DiseaseEventsCreateComponent implements OnInit, OnDestroy {
    isDevMode:boolean = ConfigService.devMode;
    diseaseEventForm:FormGroup;
    diseaseCaseKey:string;
    diseaseCaseName:string;

    diseaseEventKey:string;
    diseaseEventName:string;

    subscrRoute:Subscription;
    subscrDiseaseCase:Subscription;
    subscrDiseaseEvent:Subscription;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private location:Location,
                private af:AngularFire,
                private dataService:DataService,
                private errorHandler:ErrorHandlerService,
                private logger:LoggerService) {
    };

    ngOnInit() {
        this.diseaseEventForm = new FormGroup({
            name: new FormControl('', Validators.required),
            value: new FormControl('', Validators.required),
        });

        try {
            this.af.auth.subscribe(auth => {
                if (auth) {
                    this.subscrRoute = this.route.params.subscribe(
                        (params:any) => {
                            this.diseaseEventKey = params['diseaseEventKey'];
                            this.diseaseCaseKey = this.route.parent.snapshot.params['diseaseCaseKey'];
                            this.subscrDiseaseCase = this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                                this.diseaseCaseName = diseaseCase.name;
                                this.subscrDiseaseEvent = this.dataService.getDiseaseEvent(this.diseaseEventKey).subscribe((diseaseEvemt) => {
                                    this.diseaseEventName = diseaseEvemt.name;
                                });
                                this.dataService.addSubscripton(this.subscrDiseaseEvent);
                            });
                            this.dataService.addSubscripton(this.subscrDiseaseCase);
                        });
                } else {
                    this.logger.warn("[diseaseEvents-create] - ngOnInit - user: no logged in user");
                    this.router.navigate(['/login']);
                }
            });
        } catch (e) {
            this.errorHandler.traceError("[diseaseEvents-create] - ngOnInit - error", e, true);
        }
    };

    createDiseaseEvent(key_value: DiseaseEvent) {
        try {
            key_value.case = this.diseaseCaseKey;
            this.dataService.createDiseaseEvent(key_value);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[diseaseEvents-create] - createDiseaseEvent - error", e, true);
        }
    };

    goBack() {
        this.location.back();
    };

    onSubmit() {
        this.createDiseaseEvent(this.diseaseEventForm.value);
    };

    ngOnDestroy() {
        if (this.subscrDiseaseEvent) {
            this.subscrDiseaseEvent.unsubscribe();
        }
        if (this.subscrDiseaseCase) {
            this.subscrDiseaseCase.unsubscribe();
        }
        if (this.subscrRoute) {
            this.subscrRoute.unsubscribe();
        }
    };
}

