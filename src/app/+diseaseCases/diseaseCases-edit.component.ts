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
import { DiseaseCase } from './diseaseCases.interface';

@Component({
    templateUrl: './diseaseCases-edit.component.html',
    styleUrls  : ['../../assets/scss/forms.scss']
})
export class DiseaseCasesEditComponent implements OnInit, OnDestroy {
    isDevMode:boolean = ConfigService.devMode;
    diseaseCaseForm:FormGroup;
    diseaseCaseKey:string;
    diseaseCaseName:string;

    patientKey:string;
    patientName:string;

    showModalDialog:string;
    simulateDeletion:boolean;

    subscrRoute:Subscription;
    subscrPatient:Subscription;
    subscrDiseaseCase:Subscription;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private af:AngularFire,
                private dataService:DataService,
                private location:Location,
                private errorHandler:ErrorHandlerService,
                private logger:LoggerService) {
    };

    ngOnInit() {
        this.diseaseCaseForm = new FormGroup({
            name  : new FormControl('', Validators.required),
            type  : new FormControl('', Validators.required),
            active: new FormControl('', Validators.required)
        });

        try {
            this.simulateDeletion = true;
            this.af.auth.subscribe(auth => {
                if (auth) {
                    this.subscrRoute = this.route.params.subscribe(
                        (params:any) => {
                            this.diseaseCaseKey = params['diseaseCaseKey'];
                            this.patientKey = this.route.parent.snapshot.params['patientKey'];
                            this.subscrPatient = this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                                this.patientName = patient.name;
                                this.subscrDiseaseCase = this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                                    this.diseaseCaseName = diseaseCase.name;
                                    this.diseaseCaseForm.setValue({
                                        name  : diseaseCase.name,
                                        type  : diseaseCase.type,
                                        active: diseaseCase.active
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
            });
        } catch (e) {
            this.errorHandler.traceError("[diseaseCases-edit] - ngOnInit - error", e, true);
        }
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

    deleteDiseaseCase(simulate) {
        try {
            this.showModalDialog = "";
            this.logger.info("[diseaseCases-edit] - deleteDiseaseCase - diseaseCase: " + this.diseaseCaseKey + " - simulation: " + simulate);
            this.dataService.deleteDiseaseCase(this.diseaseCaseKey, simulate);
            this.goBack();
        } catch (e) {
            this.errorHandler.traceError("[diseaseCases-edit] - deleteDiseaseCase - error", e, true);
        }
    };

    goBack() {
        this.simulateDeletion = true;
        this.location.back(); // goes *two* steps back!?!
        //this.location.replaceState("/patients/" + this.patientKey + "/diseaseCases"); // only replace url in browser address bar
        //this.router.navigateByUrl("/patients/" + this.patientKey + "/diseaseCases"); // reload whole date :(
        //window.history.back();    // same as this.location.back()
    };

    onSubmit() {
        this.updateDiseaseCase(this.diseaseCaseForm.value);
    };

    showDeleteDialog(dialogAttribute) {
        this.simulateDeletion = true;
        this.showModalDialog = dialogAttribute;
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
    }
}


