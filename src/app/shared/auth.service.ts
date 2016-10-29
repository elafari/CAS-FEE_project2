import { Injectable } from "@angular/core";

import { Observable } from 'rxjs';

import { AngularFire } from 'angularfire2';
import { FirebaseAuthState } from "angularfire2/index";

import { UserLogin } from "./user-login.interface";

import { ConfigService } from "./config.service";
import { ErrorHandlerService } from "./error-handler.service";
import { LogService } from "./log.service";

@Injectable()
export class AuthService {

  constructor(public af:AngularFire,
              private errorHandler:ErrorHandlerService,
              private logService: LogService
  ) {}

  registerUser(user:UserLogin) {
    this.af.auth.createUser({email: user.email, password: user.password})
      .then((auth) => {

        // create entry in users - table with auth uid
        this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).set({name: user.email, admin: false});
        this.logService.logConsole("auth service","registered uid",auth.uid);
      })
      .catch((error) => {
        this.logService.logConsole("auth service","register error",error.message);
        this.errorHandler.handleError(error);
      });
  };

  loginUser(user:UserLogin) {
    this.af.auth.login({email: user.email, password: user.password})
      .then((auth) => {
        this.logService.logConsole("auth service","logged in user ",auth.auth.providerData[0].uid + " - " + auth.uid);
      })
      .catch((error) => {
        this.logService.logConsole("auth service","login error",error.message);
        this.errorHandler.handleError(error);
      });
   };

  logout() {
    this.af.auth.logout();
  };
}
