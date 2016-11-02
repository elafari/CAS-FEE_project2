
import { Component} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { LogService } from "../shared/log.service";

@Component({
  templateUrl: './patients-edit.component.html'
})
export class PatientsEditComponent {

  subscription:Subscription;

  loggedInUserName: String;

  patientKey: String;
  patientName: String;
  patientAge: String;

  showModalDialog: string;

  constructor(private route:ActivatedRoute,
              private af: AngularFire,
              private dataService: DataService,
              private logService: LogService,
              private location: Location) {

    this.subscription = this.route.params.subscribe(
      (params:any) => {
        this.patientKey = params['patientKey'];

        this.af.auth.subscribe(auth => {
          if (auth) {
            this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
              this.loggedInUserName = user.name;
              this.logService.logConsole("patients-edit", "constructor - user", user.name);

              this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                this.patientName = patient.name;
                this.patientAge = patient.age;
              });
            });
          }
        });
      });
  };

  updatePatient(key_value) {
    this.showModalDialog = "";
    this.dataService.updatePatient(this.patientKey, key_value)
    this.goBack();
  };
  deletePatient() {
    this.showModalDialog = "";
    // delete temporarily deactivated
    //this.dataService.deletePatient(this.patientKey);
  };

  goBack() {
    this.location.back();
  };

  showDeleteDialog(dialogAttribute) {
    this.showModalDialog = dialogAttribute;
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


