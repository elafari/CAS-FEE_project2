
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
  templateUrl: './diseaseCases-edit.component.html'
})
export class DiseaseCasesEditComponent {

  subscription:Subscription;

  loggedInUserKey: String;
  loggedInUserName: String;

  patientKey: String;
  patientName: String;

  diseaseCaseKey: String;
  diseaseCaseName: String;
  diseaseCaseType: String;

  constructor(private route:ActivatedRoute,
              private af: AngularFire,
              private dataService: DataService,
              private location: Location,
              private logService: LogService
  ) {

    this.subscription = this.route.params.subscribe(
      (params:any) => {
        this.diseaseCaseKey = params['diseaseCaseKey'];

        this.patientKey = this.route.parent.snapshot.params['patientKey'];

        this.af.auth.subscribe(auth => {
           if (auth) {
             this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
               this.loggedInUserKey = user.$key;
               this.loggedInUserName = user.name;
               this.logService.logConsole("diseaseCases-list", "constructor - user", this.loggedInUserName + " - " + this.loggedInUserKey);

               this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                 this.patientName = patient.name;
                 this.logService.logConsole("diseaseCases-list", "constructor - patient", patient.name);

                 this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                   this.diseaseCaseName = diseaseCase.name;
                   this.diseaseCaseType = diseaseCase.type;
                 });
               });
             });
           }
        });
    });
  };

  updateDiseaseCase(key_value) {
     this.dataService.updateDiseaseCase(this.diseaseCaseKey, key_value)
    this.goBack();
  };
  deleteDiseaseCase() {
    // delete temporarily deactivated
    //this.dataService.deleteDiseaseCase(this.diseaseCaseKey);
  };

  goBack() {
    this.location.back();
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


