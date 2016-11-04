import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './patients-list.component.html'
})
export class PatientsListComponent implements OnInit{

  loggedInUserName: String;

  allPatients: Observable<any[]>;
  patientsCount: Number;

  constructor(private af: AngularFire,
              private dataService: DataService,
              private logger: LoggerService){
  };

  ngOnInit() {
    try {
      this.af.auth.subscribe(auth => {
        if (auth) {
          this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
            this.loggedInUserName = user.name;
            this.logger.info("[patients-list] - ngOnInit - user: " + user.name);

            this.allPatients = this.dataService.getPatients(user.$key);
            if (this.allPatients) {
              this.allPatients.subscribe((queriedItems) => {
                this.patientsCount = queriedItems.length;
              });
            }
          });
        } else {
          this.logger.warn("[patients-list] - ngOnInit - user: no logged in user");
        }
      });
    } catch(e) {
      this.logger.error("[patients-list] - ngOnInit - error: " + e);
    }
  };
}
