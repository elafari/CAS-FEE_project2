import { Component } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { ConfigService } from '../shared/config.service';
import { DataService } from '../shared/data.service';
import { LogService } from '../shared/log.service';

@Component({
  templateUrl: './user-admin.component.html'
})
export class UserAdminComponent {

  users: Observable<any>;
  userMainAdmin: String;

  constructor(private dataService: DataService,
              private logService: LogService
  ) {
    this.userMainAdmin = ConfigService.mainAdmin;
    this.users = this.dataService.getUserList();
  };

  updateUser(userKey: string, role: boolean) {
    let newRole = role;
    if (newRole ==  true){
      this.dataService.setUserAdminRole(userKey);
    } else {
      this.dataService.removeUserAdminRole(userKey);
    }
    this.dataService.updateUser(userKey, { admin: newRole });
    this.logService.logConsole("user-admin","updateUser","key: " + userKey + " admin: " + newRole);
  }

  deleteUser(userKey: string) {
    alert("Delete temporarily deactivated!");
    //this.dataService.deleteUser(userKey);
  };
}
