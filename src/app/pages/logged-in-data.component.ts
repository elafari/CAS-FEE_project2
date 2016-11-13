import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { Subscription } from "rxjs/Subscription";

import { AngularFire } from 'angularfire2';

import { DataService } from "../shared/data.service";
import { ConfigService } from "../shared/config.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './logged-in-data.component.html'
})

export class LoggedInDataComponent implements OnInit, OnDestroy{

  loggedInUserData: any[];

  subscrUser : Subscription;

  constructor(private router: Router,
              private af: AngularFire,
              private dataService: DataService,
              private logger: LoggerService){
   };

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.subscrUser = this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
          this.loggedInUserData = [
            {key: "Logged in user key", value: user.$key},
            {key: "Logged in user name (email)", value: user.name},
            {key: "Logged in user role admin", value: user.admin}
          ];
        });
        this.dataService.addSubscripton(this.subscrUser);
      } else {
        this.logger.warn("[diseaseCases-create] - ngOnInit - user: no logged in user");
        this.router.navigate(['/login']);
      }
    });
  };

  ngOnDestroy() {
    if (this.subscrUser) {this.subscrUser.unsubscribe();}
  };

}
