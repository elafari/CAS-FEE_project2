
import { Component} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { LogService } from "../shared/log.service";

@Component({
  templateUrl: './diseaseCases-create.component.html'
})
export class DiseaseCasesCreateComponent {

  private subscription: Subscription;

  loggedInUserName: String;

  patientKey: String;
  patientName: String;

  diseaseCaseKey: String;
  diseaseCaseName: String;

  constructor(private route: ActivatedRoute,
              private af: AngularFire,
              private location: Location,
              private dataService: DataService,
              private logService: LogService
  ){

    this.subscription = this.route.params.subscribe(
      (params:any) => {
        this.diseaseCaseKey = params['diseaseCaseKey'];

        this.patientKey = this.route.parent.snapshot.params['patientKey'];
        console.log("diseaseCases new - patientKey: " + this.patientKey);
        this.logService.logConsole("diseaseCases-create", "constructor - patientKey: ", this.patientKey);

        this.af.auth.subscribe(auth => {
          if (auth) {
            this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
              this.loggedInUserName = user.name;
              this.logService.logConsole("diseaseCases-create", "constructor - user", this.loggedInUserName);

                this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                this.patientName = patient.name;
                this.logService.logConsole("diseaseCases-create", "constructor - patient", patient.name);

                this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                  this.diseaseCaseName = diseaseCase.name;

                });
              });
            });
          }
        });
      });
  };

  createDiseaseCase(key_value) {
    this.dataService.createDiseaseCase(key_value);
    this.goBack();
  };

  goBack() {
    this.location.back();
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}

