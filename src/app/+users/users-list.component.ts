import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from 'rxjs';

import { AngularFire } from 'angularfire2';

import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit{

  allUsers: Observable<any[]>;
  allUsersCount: Number;

  constructor(private router: Router,
              private af: AngularFire,
              private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService){
  };

  ngOnInit() {
    try {
      this.af.auth.subscribe(auth => {
        if (auth) {
          this.allUsers = this.dataService.getAllUsersAndPatients();
          this.allUsers.subscribe((queriedItems) => {
            this.allUsersCount = queriedItems.length
          });
        } else {
          this.logger.warn("[users-list] - ngOnInit - user: no logged in user");
          this.router.navigate(['/']);
        }
      });
    } catch(e) {
      this.errorHandler.traceError("[users-list] - ngOnInit - error", e, true);
    }
  }
}

