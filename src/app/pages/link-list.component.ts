import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { AngularFire } from 'angularfire2';

import { AuthService } from "../auth/auth.service";
import { ConfigService } from '../shared/config.service';
import { DataService } from '../shared/data.service';
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl: './link-list.component.html'
})

export class LinkListComponent implements OnInit, OnDestroy {
    linkList:any[];

    subscrUser:Subscription;

    constructor(private router:Router,
                private af:AngularFire,
                private authService:AuthService,
                private dataService:DataService,
                private errorHandler:ErrorHandlerService,
                private logger:LoggerService) {
    };

    ngOnInit() {
        try {
            // todo: try to solve with a resolver (see Architecture.md "auth reload")
            /*this.subscrUser = this.authService.user$.subscribe(
             (user:UserClass) => {
             if (user.isLoggedIn()) { */
            this.af.auth.subscribe(auth => {
                    if (auth) {
                        this.linkList = ConfigService.linkList;
                    } else {
                        this.logger.warn("[link-list] - ngOnInit - user: no logged in user");
                        this.router.navigate(['/login']);
                    }
                }
            );
            this.dataService.addSubscripton(this.subscrUser);
        } catch (e) {
            this.errorHandler.traceError("[link-list] - ngOnInit - error", e, true);
        }
    };

    ngOnDestroy() {
        if (this.subscrUser) this.subscrUser.unsubscribe();
    };
}
