import { Component } from '@angular/core';

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { LogService } from "../shared/log.service";

@Component({
  templateUrl: './logged-in-data.component.html'
})

export class LoggedInDataComponent {

  loggedInUserData: any[];

  constructor(private af: AngularFire,
              private logService: LogService
  ){
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
          this.loggedInUserData = [
            {key: "Logged in user key", value: user.$key},
            {key: "Logged in user name (email)", value: user.name},
            {key: "Logged in user role admin", value: user.admin}
          ];
          this.logService.logConsole("diseaseCases-list", "constructor - user", user.name);
        });
      }
    });
  };
}
