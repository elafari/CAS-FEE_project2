import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { ConfigService } from '../shared/config.service';
import { DataService } from '../shared/data.service';
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl: './user-admin.component.html',
    styleUrls  : ['../../assets/scss/tables.scss', '../../assets/scss/toggler.scss']
})
export class UserAdminComponent implements OnInit, OnDestroy {
    isDevMode: boolean = ConfigService.devMode;
    msgList: any = ConfigService.msgList;
    users: Observable<any>;
    userMainAdmin: string;

    showModalDialog: string;
    simulateDeletion: boolean;

    constructor(private router: Router,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        try {
            this.simulateDeletion = this.isDevMode;
            this.userMainAdmin = ConfigService.mainAdmin;
            this.users = this.dataService.getUserList();
        } catch (e) {
            this.errorHandler.traceError("[user-admin] - ngOnInit - error", e, true);
        }
    };

    updateUser(userKey: string, role: boolean) {
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

    deleteUser(userKey: string) {
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

    };
}
