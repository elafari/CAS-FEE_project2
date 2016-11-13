
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './diseaseCases-create.component.html'
})
export class DiseaseCasesCreateComponent implements OnInit, OnDestroy{

  patientKey: string;
  patientName: string;

  diseaseCaseKey: string;
  diseaseCaseName: string;

  subscrRoute: Subscription;
  subscrPatient: Subscription;
  subscrDiseaseCase: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private af: AngularFire,
              private location: Location,
              private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService) {
  };

  ngOnInit() {
    try {
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
    } catch(e) {
      this.errorHandler.traceError("[diseaseCases-create] - ngOnInit - error", e, true);
    }
  };

  createDiseaseCase(key_value) {
    try {
      this.dataService.createDiseaseCase(key_value);
      this.goBack();
    } catch(e) {
      this.errorHandler.traceError("[diseaseCases-create] - createDiseaseCase - error", e, true);
    }
  };

  goBack() {
    this.location.back();
  };

  ngOnDestroy() {
    if (this.subscrDiseaseCase) {this.subscrDiseaseCase.unsubscribe();}
    if (this.subscrPatient) {this.subscrPatient.unsubscribe();}
    if (this.subscrRoute) {this.subscrRoute.unsubscribe();}
  };
}

