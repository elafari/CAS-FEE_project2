import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { AngularFire } from 'angularfire2';

import { AuthService } from "../auth/auth.service";
import { ConfigService } from "./config.service";
import { LoggerService } from "../log/logger.service";

declare var jQuery: any;

@Component({
    selector: 'disease-diary-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

    loggedInUserName: String;
    loggedInUserAdmin: String;

    constructor(private authService: AuthService,
                private logger: LoggerService,
                private af: AngularFire,
                private router: Router) {
    };

    ngOnInit() {
        try {
            this.af.auth.subscribe(auth => {
                if (auth) {
                    this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
                        this.loggedInUserName = user.name;
                        this.loggedInUserAdmin = user.admin;
                        this.logger.info("[header] - ngOnInit - user : " + user.name + ' admin: ' + user.admin);
                    });
                }
            });
        } catch (e) {
            this.logger.error("[header] - ngOnInit - error: " + e);
        }
    };

    onLogout(nav) {
        try {
            this.authService.logout();
            this.collapseNav(nav);
            this.logger.info("[header] - onLogout: logged out");
            this.router.navigate(['']);
        } catch (e) {
            this.logger.error("[header] - onLogout - error: " + e);
        }
    };

    collapseNav(nav) {
        jQuery(nav).collapse('hide');
    };
}
