import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs';

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { LogService } from "../shared/log.service";

@Component({
  templateUrl: './diseaseEvents-list.component.html'
})
export class DiseaseEventsListComponent {

  loggedInUserName: String;

  patientKey: String;
  patientName: String;

  diseaseCaseKey: String;
  diseaseCaseName: String;

  allDiseaseEvents: Observable<any[]>;
  diseaseEventsCount: Number;

  constructor(private route: ActivatedRoute,
              private af: AngularFire,
              private dataService: DataService,
              private logService: LogService
){

    this.route.params.subscribe(
      (params:any) => {
        this.diseaseCaseKey = params['diseaseCaseKey'];
        this.logService.logConsole("diseaseEvents-list", "constructor - Router diseaseCaseKey", this.diseaseCaseKey);

        // Gilt nur beim Sub-Routing:
        //    parent routing parameter wird nicht gefunden:
        //    der parent parameter heisst auch komischerweise diseaseCaseKey !?!?
        // Beim Eintrag in die Basis-Route funktioniert es
        this.patientKey = this.route.parent.snapshot.params['patientKey'];
        this.logService.logConsole("diseaseEvents-list", "constructor - Router patientKey", this.patientKey);

        this.af.auth.subscribe(auth => {
          if (auth) {
            this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
              this.loggedInUserName = user.name;
              this.logService.logConsole("diseaseEvents-list", "constructor - user", this.loggedInUserName);

              this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                this.patientName = patient.name;
                this.logService.logConsole("diseaseEvents-list", "constructor - patient", patient.name);

                this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                  this.diseaseCaseName = diseaseCase.name;
                  this.logService.logConsole("diseaseEvents-list", "constructor - diseaseCase", diseaseCase.name);

                  this.allDiseaseEvents = this.dataService.getDiseaseEvents(this.diseaseCaseKey);
                  if (this.allDiseaseEvents) {
                    this.allDiseaseEvents.subscribe((queriedItems) => {
                      this.diseaseEventsCount = queriedItems.length;
                    });
                  }
                });
              });
            });
          }
        });
    });
  };
}
