import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { AngularFire } from 'angularfire2';

import { AuthService } from "../auth/auth.service";
import { ConfigService } from "../shared/config.service";
import { LogService } from "../shared/log.service";

@Component({
    selector: 'disease-diary-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    loggedInUserName: String;
    loggedInUserAdmin: String;

    constructor(private authService: AuthService,
                private logService: LogService,
                private af: AngularFire,
                private router: Router) {
    };

    ngOnInit() {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).subscribe((user) => {
                    this.loggedInUserName = user.name;
                    this.loggedInUserAdmin = user.admin;
                    this.logService.logConsole("patients-list", "ngOnInit - user", user.name + ' admin: ' + user.admin);
                });
            }
        });
    };

    onLogout() {
        this.authService.logout();
        this.router.navigate(['']);
    };
}
