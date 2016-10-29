import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs';

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { LogService } from "../shared/log.service";

@Component({
  templateUrl: './diseaseCases-list.component.html'
})
export class DiseaseCasesListComponent {

  loggedInUserName: String;

  patientKey: String;
  patientName: String;

  allDiseaseCases: Observable<any[]>;
  diseaseCasesCount: Number;

  constructor(private route: ActivatedRoute,
              private af: AngularFire,
              private dataService: DataService,
              private logService: LogService
  ){

    this.route.params.subscribe(
      (params:any) => {
        this.patientKey = params['patientKey'];
        this.logService.logConsole("diseaseCases-list", "constructor - Router patientKey", this.patientKey);

        this.af.auth.subscribe(auth => {
          if (auth) {
            this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
              this.loggedInUserName = user.name;
              this.logService.logConsole("diseaseCases-list", "constructor - user", this.loggedInUserName );

               this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                this.patientName = patient.name;
                this.logService.logConsole("diseaseCases-list", "constructor - patient", patient.name);

                this.allDiseaseCases = this.dataService.getDiseaseCases(this.patientKey);
                if (this.allDiseaseCases) {
                  this.allDiseaseCases.subscribe((queriedItems) => {
                    this.diseaseCasesCount = queriedItems.length;
                  });
                }
              });
            });
          }
        });
      });
  };
}
