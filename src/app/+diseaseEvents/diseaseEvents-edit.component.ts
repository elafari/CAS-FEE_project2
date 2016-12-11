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
import { DiseaseEvent } from './diseaseEvents.interface';
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl: './diseaseEvents-edit.component.html',
    styleUrls  : ['../../assets/scss/forms.scss']
})
export class DiseaseEventsEditComponent implements OnInit, OnDestroy {
    isDevMode:boolean = ConfigService.devMode;
    eventTypeConfig:any[] = ConfigService.getEventType();
    msgList: any = ConfigService.msgList;
    diseaseEventForm:FormGroup;
    diseaseCaseKey:string;
    diseaseCaseName:string;
    diseaseEventKey:string;
    diseaseEventName:string;

    showModalDialog:string;
    simulateDeletion:boolean;

    subscrUser:Subscription;
    subscrRoute:Subscription;
    subscrDiseaseCase:Subscription;
    subscrDiseaseEvent:Subscription;

    constructor(private fb:FormBuilder,
                private router:Router,
                private route:ActivatedRoute,
                private authService:AuthService,
                private dataService:DataService,
                private errorHandler:ErrorHandlerService,
                private logger:LoggerService,
                private location:Location) {
    };

    ngOnInit() {
        this.diseaseEventForm = this.fb.group({
            name : ['', Validators.required],
            value: ['', Validators.required]
        });

        try {
            this.simulateDeletion = this.isDevMode;
            this.subscrUser = this.authService.user$.subscribe(
                (user:UserClass) => {
                    if (user.isLoggedIn()) {
                        this.subscrRoute = this.route.params.subscribe(
                            (params:any) => {
                                this.diseaseEventKey = params['diseaseEventKey'];
                                this.diseaseCaseKey = this.route.parent.snapshot.params['diseaseCaseKey'];
                                this.subscrDiseaseCase = this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                                    this.diseaseCaseName = diseaseCase.name;
                                    this.subscrDiseaseEvent = this.dataService.getDiseaseEvent(this.diseaseEventKey).subscribe((diseaseCase) => {
                                        this.diseaseEventName = diseaseCase.name;
                                        this.diseaseEventForm.setValue({
                                            name : diseaseCase.name,
                                            value: diseaseCase.value
                                        });
                                    });
                                    this.dataService.addSubscripton(this.subscrDiseaseEvent);
                                });
                                this.dataService.addSubscripton(this.subscrDiseaseCase);
                            });
                    } else {
                        this.logger.warn("[diseaseEvents-edit] - ngOnInit - user: no logged in user");
                        this.router.navigate(['/login']);
                    }
                }
            );
            this.dataService.addSubscripton(this.subscrUser);
        } catch (e) {
            this.errorHandler.traceError("[diseaseEvents-edit] - ngOnInit - error", e, true);
        }
    };

    updateDiseaseEvent(key_value:DiseaseEvent) {
        try {
            this.showModalDialog = "";
            this.dataService.updateDiseaseEvent(this.diseaseEventKey, key_value);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[diseaseEvents-edit] - updateDiseaseEvent - error", e, true);
        }
    };

    deleteDiseaseEvent() {
        try {
            let simulate = this.simulateDeletion;
            this.showModalDialog = "";
            this.logger.info("[diseaseEvents-edit] - deleteDiseaseEvent - diseaseEvent: " + this.diseaseEventKey + " - simulation: " + simulate);
            this.dataService.deleteDiseaseEvent(this.diseaseEventKey, simulate);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[diseaseEvents-edit] - deleteDiseaseEvent - error", e, true);
        }
    };

    goBack() {
        this.simulateDeletion = this.isDevMode;
        this.location.back();
    };

    onSubmit() {
        this.updateDiseaseEvent(this.diseaseEventForm.value);
    };

    showDeleteDialog(dialogAttribute) {
        this.simulateDeletion = this.isDevMode;
        this.showModalDialog = dialogAttribute;
    };

    ngOnDestroy() {
        if (this.subscrDiseaseEvent) this.subscrDiseaseEvent.unsubscribe();
        if (this.subscrDiseaseCase) this.subscrDiseaseCase.unsubscribe();
        if (this.subscrRoute) this.subscrRoute.unsubscribe();
        if (this.subscrUser) this.subscrUser.unsubscribe();
    }
}
