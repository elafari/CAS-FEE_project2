import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

//import { AngularFire } from 'angularfire2';

import { AuthService } from "../auth/auth.service";
import { ConfigService } from '../shared/config.service';
import { DataService } from '../shared/data.service';
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl: './user-admin.component.html',
    styleUrls  : ['../../assets/scss/toggler.scss']
})
export class UserAdminComponent implements OnInit, OnDestroy {
    isDevMode:boolean = ConfigService.devMode;
    users:Observable<any>;
    userMainAdmin:string;

    showModalDialog:string;
    simulateDeletion:boolean;

    subscrUser:Subscription;

    constructor(private router:Router,
                //private af:AngularFire,
                private authService:AuthService,
                private dataService:DataService,
                private errorHandler:ErrorHandlerService,
                private logger:LoggerService) {
    };

    ngOnInit() {
        try {
            this.subscrUser = this.authService.user$.subscribe(
                (user:UserClass) => {
                    if (user.isLoggedIn()) {
                        /*this.af.auth.subscribe(auth => {
                         if (auth) {*/
                        this.simulateDeletion = this.isDevMode;
                        this.userMainAdmin = ConfigService.mainAdmin;
                        this.users = this.dataService.getUserList();
                    } else {
                        this.logger.warn("[user-admin] - ngOnInit - user: no logged in user");
                        this.router.navigate(['/login']);
                    }
                }
            );
            this.dataService.addSubscripton(this.subscrUser);
        } catch (e) {
            this.errorHandler.traceError("[user-admin] - ngOnInit - error", e, true);
        }
    };

    updateUser(userKey:string, role:boolean) {
        try {
            this.showModalDialog = "";
            let newRole = role;
            if (newRole == true) {
                this.dataService.setUserAdminRole(userKey);
            } else {
                this.dataService.removeUserAdminRole(userKey);
            }
            this.dataService.updateUser(userKey, {admin: newRole});
        } catch (e) {
            this.errorHandler.traceError("[user-admin] - updateUser - error", e, true);
        }
    }

    deleteUser(userKey:string) {
        try {
            let simulate = this.simulateDeletion;
            this.showModalDialog = "";
            this.logger.info("[user-admin] - deleteUser - user: " + userKey + " - simulation: " + simulate);
            this.dataService.deleteUser(userKey, simulate);
        } catch (e) {
            this.errorHandler.traceError("[user-admin] - deleteUser - error", e, true);
        }
    };

    showDeleteDialog(dialogAttribute) {
        this.simulateDeletion = this.isDevMode;
        this.showModalDialog = dialogAttribute;
    };

    ngOnDestroy() {
        if (this.subscrUser) this.subscrUser.unsubscribe();
    };
}
