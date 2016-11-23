import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";
import { Subscription } from "rxjs/Subscription";

import { AngularFire } from 'angularfire2';

import { AuthService } from "../auth/auth.service";
import { DataService } from "../shared/data.service";
import { ConfigService } from "./config.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service"

declare var jQuery: any;

@Component({
    selector   : 'disease-diary-header',
    templateUrl: 'header.component.html',
    styleUrls  : ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    loggedInUserName: string;
    loggedInUserAdmin: string;

    subscrUser: Subscription;

    constructor(private authService: AuthService,
                private af: AngularFire,
                private router: Router,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        try {
            this.af.auth.subscribe(auth => {
                if (auth) {
                    this.subscrUser = this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
                        this.loggedInUserName = user.name;
                        this.loggedInUserAdmin = user.admin;
                        this.logger.info("[header] - ngOnInit - user : " + user.name + ' admin: ' + user.admin);
                    });
                    this.dataService.addSubscripton(this.subscrUser);
                }
            });
        } catch (e) {
            this.errorHandler.traceError("[header] - ngOnInit - error", e, true);
        }
    };

    onLogout(nav) {
        try {
            this.collapseNav(nav);
            this.dataService.removeSubscriptions();
            this.router.navigate(['/login']);
            this.authService.logout();
            this.logger.info("[header] - onLogout: logged out");
        } catch (e) {
            this.errorHandler.traceError("[header] - onLogout - error", e, true);
        }
    };

    collapseNav(nav) {
        jQuery(nav).collapse('hide');
    };

    ngOnDestroy() {
        if (this.subscrUser) {
            this.subscrUser.unsubscribe();
        }
    };

}
