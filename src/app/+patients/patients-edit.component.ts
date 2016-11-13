
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

  loggedInUserName: String;

  patientKey: String;
  patientName: String;
  patientAge: String;

  showModalDialog: string;
  simulateDeletion: boolean;

  subscrRoute: Subscription;
  subscrUser: Subscription;
  subscrPatient: Subscription;

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
      this.simulateDeletion = true;
      this.af.auth.subscribe(auth => {
        if (auth) {
          this.subscrRoute = this.route.params.subscribe(
            (params:any) => {
              this.patientKey = params['patientKey'];
              this.subscrUser = this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
                this.loggedInUserName = user.name;
                this.subscrPatient = this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                  this.patientName = patient.name;
                  this.patientAge = patient.age;

                  this.logger.info("[patients-edit] - ngOnInit - data : " + user.name + ' patient: ' + patient.name);
                });
                this.dataService.addSubscripton(this.subscrPatient);
              });
              this.dataService.addSubscripton(this.subscrUser);
            });
        } else {
          this.logger.warn("[patients-edit] - ngOnInit - user: no logged in user");
          this.router.navigate(['/login']);
        }
      });
    } catch(e) {
      this.errorHandler.traceError("[patients-edit] - ngOnInit - error", e, true);
    }
  };

  updatePatient(key_value) {
    try {
      this.showModalDialog = "";
      this.dataService.updatePatient(this.patientKey, key_value);
      this.goBack();
    } catch(e) {
      this.errorHandler.traceError("[patients-edit] - updatePatient - error", e, true);
    }
  };
  deletePatient(simulate) {
    try {
      this.showModalDialog = "";
      this.logger.info("[patients-edit] - deletePatient - patient: " + this.patientKey + " - simulation: " + simulate);
      this.dataService.deletePatient(this.patientKey, simulate);
      this.goBack();
    } catch(e) {
      this.errorHandler.traceError("[patients-edit] - deletePatient - error", e, true);
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
    if (this.subscrPatient) {this.subscrPatient.unsubscribe();}
    if (this.subscrUser) {this.subscrUser.unsubscribe();}
    if (this.subscrRoute) {this.subscrRoute.unsubscribe();}
  }
}


