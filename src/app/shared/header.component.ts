import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { AngularFire } from 'angularfire2';

import { AuthService } from "../auth/auth.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service"
import { User } from "../auth/user.interface";

declare var jQuery: any;

@Component({
    selector   : 'disease-diary-header',
    templateUrl: 'header.component.html',
    styleUrls  : ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    private isLoggedIn: boolean = false;
    private loggedInUserName: string;
    private loggedInUserAdmin: boolean;

    subscrUser: Subscription;

    constructor(private authService: AuthService,
                private af: AngularFire,
                private router: Router,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        this.authService.userData.subscribe(
            (userData: User) => {
                this.isLoggedIn = (userData && userData.key) ? true : false;
                this.loggedInUserName = userData.name;
                this.loggedInUserAdmin = userData.isAdmin;
                debugger;
            },
            (error) => this.logger.error("[header] - onInit - error: " + error.message)
        );
    };

    onLogout(nav) {
        try {
            debugger;
            this.collapseNav(nav);
            this.dataService.removeSubscriptions();
            this.router.navigate(['/login']);
            this.authService.logout();
            this.logger.info("[header] - onLogout: logged out");
        } catch (e) {
            this.errorHandler.traceError("[header] - onLogout - error", e, true);
        }
    };

    private collapseNav(nav) {
        jQuery(nav).collapse('hide');
    };

    ngOnDestroy() {
        if (this.subscrUser) {
            this.subscrUser.unsubscribe();
        }
    };
}
