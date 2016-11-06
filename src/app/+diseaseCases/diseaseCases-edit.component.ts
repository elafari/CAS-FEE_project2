
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './diseaseCases-edit.component.html'
})
export class DiseaseCasesEditComponent implements OnInit{

  subscription:Subscription;

  patientKey: String;
  patientName: String;

  diseaseCaseKey: String;
  diseaseCaseName: String;
  diseaseCaseType: String;

  showModalDialog: string;

  constructor(private router: Router,
              private route:ActivatedRoute,
              private af: AngularFire,
              private dataService: DataService,
              private location: Location,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService) {
  };

  ngOnInit() {
    try {
      this.af.auth.subscribe(auth => {
        if (auth) {
          this.subscription = this.route.params.subscribe(
            (params:any) => {
              this.diseaseCaseKey = params['diseaseCaseKey'];
              this.patientKey = this.route.parent.snapshot.params['patientKey'];
              this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                this.patientName = patient.name;
                this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                  this.diseaseCaseName = diseaseCase.name;
                  this.diseaseCaseType = diseaseCase.type;
                });
              });
            });
        } else {
          this.logger.warn("[diseaseCases-edit] - ngOnInit - user: no logged in user");
          this.router.navigate(['/']);
        }
      });
    } catch(e) {
      this.errorHandler.traceError("[diseaseCases-edit] - ngOnInit - error", e, true);
    }
  };

  updateDiseaseCase(key_value) {
    try {
      this.showModalDialog = "";
      this.dataService.updateDiseaseCase(this.diseaseCaseKey, key_value)
      this.goBack();
    } catch(e) {
      this.errorHandler.traceError("[diseaseCases-edit] - updateDiseaseCase - error", e, true);
    }
  };
  deleteDiseaseCase() {
    try {
      this.showModalDialog = "";

      // delete temporarily deactivated
      //this.dataService.deleteDiseaseCase(this.diseaseCaseKey);

    } catch(e) {
      this.errorHandler.traceError("[diseaseCases-edit] - deleteDiseaseCase - error", e, true);
    }
  };

  goBack() {
    this.location.back();
  };

  showDeleteDialog(dialogAttribute) {
    this.showModalDialog = dialogAttribute;
  };

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


