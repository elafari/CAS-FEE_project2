
import { Component, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './patients-create.component.html'
})
export class PatientsCreateComponent implements OnInit{

  loggedInUserName: String;

  constructor(private router: Router,
              private location: Location,
              private af: AngularFire,
              private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService){
  };

  ngOnInit() {
    try {
      this.af.auth.subscribe(auth => {
        if (auth) {
          this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
            this.loggedInUserName = user.name;
          });
        } else {
          this.logger.warn("[patients-create] - ngOnInit - user: no logged in user");
          this.router.navigate(['/']);
        }
      });
    } catch(e) {
      this.errorHandler.traceError("[patients-create] - ngOnInit - error", e, true);
    }
  };

  createPatient(key_value) {
    try {
      this.dataService.createPatient(key_value);
      this.goBack();
    } catch(e) {
      this.errorHandler.traceError("[patients-create] - createPatient - error", e, true);
    }
  };

  goBack() {
    this.location.back();
  };
}

