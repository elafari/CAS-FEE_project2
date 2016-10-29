import { Component } from '@angular/core';

import { Observable } from "rxjs";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { LogService } from "../shared/log.service";

@Component({
  templateUrl: './logged-in-data.component.html'
})

export class LoggedInDataComponent {

  loggedInUserKey: String;
  loggedInUserName: String;
  loggedInUserRole: String;

  constructor(private af: AngularFire,
              private logService: LogService
  ){
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
          this.loggedInUserKey = user.$key;
          this.loggedInUserName = user.name;
          this.loggedInUserRole = user.admin;

          /* todo: Array füllen und im template mit *ngFor in Tabelle füllen */

          this.logService.logConsole("diseaseCases-list", "constructor - user", this.loggedInUserName);
        });
      }
    });
  };
}
