
import { Component, OnInit, OnDestroy} from '@angular/core';
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
  templateUrl: './patients-edit.component.html'
})
export class PatientsEditComponent implements OnInit, OnDestroy{

  subscription:Subscription;

  loggedInUserName: String;

  patientKey: String;
  patientName: String;
  patientAge: String;

  showModalDialog: string;

  constructor(private router: Router,
              private route:ActivatedRoute,
              private location: Location,
              private af: AngularFire,
              private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService) {
  };

  ngOnInit() {
    try {
      this.af.auth.subscribe(auth => {
        if (auth) {
          this.subscription = this.route.params.subscribe(
            (params:any) => {
              this.patientKey = params['patientKey'];
              this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
                this.loggedInUserName = user.name;
                this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                  this.patientName = patient.name;
                  this.patientAge = patient.age;

                  this.logger.info("[patients-edit] - ngOnInit - data : " + user.name + ' patient: ' + patient.name);
                });
              });

            });
        } else {
          this.logger.warn("[patients-edit] - ngOnInit - user: no logged in user");
          this.router.navigate(['/']);
        }
      });
    } catch(e) {
      this.errorHandler.traceError("[patients-edit] - ngOnInit - error", e, true);
    }
  };

  updatePatient(key_value) {
    try {
      this.showModalDialog = "";
      this.dataService.updatePatient(this.patientKey, key_value)
      this.goBack();
    } catch(e) {
      this.errorHandler.traceError("[patients-edit] - updatePatient - error", e, true);
    }
  };
  deletePatient() {
    try {
      this.showModalDialog = "";

      // delete temporarily deactivated
      //this.dataService.deletePatient(this.patientKey);

    } catch(e) {
      this.errorHandler.traceError("[patients-edit] - deletePatient - error", e, true);
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


