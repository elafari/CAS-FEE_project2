
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import {ConfigService} from "../shared/config.service";
import {DataService} from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './diseaseEvents-edit.component.html'
})
export class DiseaseEventsEditComponent implements OnInit{

  subscription:Subscription;

  diseaseCaseKey: String;
  diseaseCaseName: String;
  diseaseEventKey: String;
  diseaseEventName: String;
  diseaseEventValue: String;

  showModalDialog: string;
  simulateDeletion: boolean;

  constructor(private router: Router,
              private route:ActivatedRoute,
              private af: AngularFire,
              private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService,
              private location: Location) {
  };

  ngOnInit() {
    try {
      this.simulateDeletion = true;
      this.af.auth.subscribe(auth => {
        if (auth) {
          this.subscription = this.route.params.subscribe(
            (params:any) => {
              this.diseaseEventKey = params['diseaseEventKey'];
              this.diseaseCaseKey = this.route.parent.snapshot.params['diseaseCaseKey'];
              this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                this.diseaseCaseName = diseaseCase.name;
                this.dataService.getDiseaseEvent(this.diseaseEventKey).subscribe((diseaseCase) => {
                  this.diseaseEventName = diseaseCase.name;
                  this.diseaseEventValue = diseaseCase.value;
                });
              });
            });
        } else {
          this.logger.warn("[diseaseEvents-edit] - ngOnInit - user: no logged in user");
          this.router.navigate(['/']);
        }
      });
    } catch(e) {
      this.errorHandler.traceError("[diseaseEvents-edit] - ngOnInit - error", e, true);
    }
  };

  updateDiseaseEvent(key_value) {
    try {
      this.showModalDialog = "";
      this.dataService.updateDiseaseEvent(this.diseaseEventKey, key_value)
      this.goBack();
    } catch(e) {
      this.errorHandler.traceError("[diseaseEvents-edit] - updateDiseaseEvent - error", e, true);
    }
  };
  deleteDiseaseEvent(simulate) {
    try {
      this.showModalDialog = "";
      this.logger.info("[diseaseEvents-edit] - deleteDiseaseEvent - diseaseEvent: " + this.diseaseEventKey + " - simulation: " + simulate);
      this.dataService.deleteDiseaseEvent(this.diseaseEventKey, simulate);
      this.goBack();
    } catch(e) {
      this.errorHandler.traceError("[diseaseEvents-edit] - deleteDiseaseEvent - error", e, true);
    }
  };

  goBack() {
    this.simulateDeletion = true;
    this.location.back();
  };

  showDeleteDialog(dialogAttribute) {
    this.simulateDeletion = true;
    this.showModalDialog = dialogAttribute;
  };

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


