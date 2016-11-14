import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Subscription";

import { AngularFire } from 'angularfire2';

import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
    templateUrl: './users-list.component.html',
    styleUrls  : ['../../assets/scss/cards.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

    allUsers: Observable<any[]>;
    allUsersCount: number;
    subscrUsers: Subscription;

    constructor(private router: Router,
                private af: AngularFire,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        try {
            this.af.auth.subscribe(auth => {
                if (auth) {
                    this.allUsers = this.dataService.getAllUsersAndPatients();
                    this.subscrUsers = this.allUsers.subscribe((queriedItems) => {
                        this.allUsersCount = queriedItems.length
                    });
                    this.dataService.addSubscripton(this.subscrUsers);
                } else {
                    this.logger.warn("[users-list] - ngOnInit - user: no logged in user");
                    this.router.navigate(['/login']);
                }
            });
        } catch (e) {
            this.errorHandler.traceError("[users-list] - ngOnInit - error", e, true);
        }
    };

    ngOnDestroy() {
        if (this.subscrUsers) {
            this.subscrUsers.unsubscribe();
        }
    };
}

