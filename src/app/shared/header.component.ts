import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "../auth/auth.service";
import { DataService } from "./data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service"
import { UserClass } from "../auth/user.interface";

declare let jQuery: any;

@Component({
    selector   : 'disease-diary-header',
    templateUrl: 'header.component.html',
    styleUrls  : ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    private subscrUser: Subscription;
    private isLoggedIn: boolean = false;
    private loggedInUserName: string;
    private loggedInUserAdmin: boolean;

    constructor(private authService: AuthService,
                private router: Router,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        try {
            this.subscrUser = this.authService.user.subscribe(
                (user: UserClass) => {
                    this.isLoggedIn = !!(user && user.key);
                    this.loggedInUserName = user.name;
                    this.loggedInUserAdmin = user.isAdmin;
                },
                (error) => this.logger.error("[header] - onInit - error: " + error.message)
            );
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

    private collapseNav(nav) {
        jQuery(nav).collapse('hide');
    };

    ngOnDestroy() {
        if (this.subscrUser) this.subscrUser.unsubscribe();
    };
}
