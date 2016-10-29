import { Component } from '@angular/core';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { ConfigService } from '../shared/config.service';
import { DataService } from '../shared/data.service';
import { LogService } from '../shared/log.service';

@Component({
  templateUrl: './user-admin.component.html'
})
export class UserAdminComponent {

  users: FirebaseListObservable<any>;
  userMainAdmin: String;

  constructor(private af: AngularFire,
              private dataService: DataService,
              private logService: LogService
  ) {
    this.userMainAdmin = ConfigService.mainAdmin;
    this.users = this.af.database.list(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users);
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
