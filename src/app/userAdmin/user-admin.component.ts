import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { ConfigService } from '../shared/config.service';
import { DataService } from '../shared/data.service';
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './user-admin.component.html'
})
export class UserAdminComponent implements OnInit{

  users: Observable<any>;
  userMainAdmin: String;

  showModalDialog: string;
  simulateDeletion: boolean;

  constructor(private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService) {
  };

  ngOnInit() {
    try {
      this.simulateDeletion = true;
      this.userMainAdmin = ConfigService.mainAdmin;
      this.users = this.dataService.getUserList();
    } catch(e) {
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
    } catch(e) {
      this.errorHandler.traceError("[user-admin] - updateUser - error", e, true);
    }
  }

  deleteUser(userKey: string, simulate: boolean) {
    try {
      this.showModalDialog = "";
      this.logger.info("[user-admin] - deleteUser - user: " + userKey + " - simulation: " + simulate);
      this.dataService.deleteUser(userKey, simulate);
    } catch(e) {
      this.errorHandler.traceError("[user-admin] - deleteUser - error", e, true);
    }
  };

  showDeleteDialog(dialogAttribute) {
    this.simulateDeletion = true;
    this.showModalDialog = dialogAttribute;
  };
}
