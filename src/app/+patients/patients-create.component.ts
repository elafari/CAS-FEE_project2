
import { Component} from '@angular/core';
import { Location } from "@angular/common";

import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { LogService } from "../shared/log.service";

@Component({
  templateUrl: './patients-create.component.html'
})
export class PatientsCreateComponent {

  loggedInUserName: String;

  constructor(private af: AngularFire,
              private location: Location,
              private dataService: DataService,
              private logService: LogService
  ){

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
          this.loggedInUserName = user.name;
        });
      }
    });
  };

  createPatient(key_value) {
    this.logService.logConsole("patients-create","createPatient",key_value);
    this.dataService.createPatient(key_value);
    this.goBack();
  };

  goBack() {
    this.location.back();
  };
}

