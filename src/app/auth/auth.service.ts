import { Injectable } from "@angular/core";

import { Observable } from 'rxjs';

import { AngularFire } from 'angularfire2';
import { FirebaseAuthState } from "angularfire2/index";

import { UserLogin } from "./user-login.interface";

import { ConfigService } from "../shared/config.service";
import { LoggedInUserService } from "./logged-in-user.service";
import { LogService } from "../shared/log.service";

@Injectable()
export class AuthService {

  constructor(public af:AngularFire,
              private loggedInUserService: LoggedInUserService,
              private logService: LogService
  ) {}

  registerUser(user:UserLogin) {
    this.af.auth.createUser({email: user.email, password: user.password})
      .then((auth) => {
        this.loggedInUserService.setUserData({key: auth.uid, email: auth.auth.providerData[0].uid, error: ""});

        // create entry in users - table with auth uid
        this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).set({name: user.email, admin: false});
        this.logService.logConsole("auth service","registered uid",auth.uid);
      })
      .catch((error) => {
        this.loggedInUserService.setUserData({key: "", email: "", error: error.message});

        this.logService.logConsole("auth service","register error",error.message);
      });
  };

  loginUser(user:UserLogin) {
    this.loggedInUserService.setUserData({key: "", email: "", error: ConfigService.loginProcessMsg});
    this.af.auth.login({email: user.email, password: user.password})
      .then((auth) => {
        this.loggedInUserService.setUserData({key: auth.uid, email: auth.auth.providerData[0].uid, error: ""});

        this.logService.logConsole("auth service", "logged in user", auth.auth.providerData[0].uid + " - " + auth.uid);
      })
      .catch((error) => {
        this.loggedInUserService.setUserData({key: "", email: "", error: error.message});

        this.logService.logConsole("auth service", "login error", error.message);
      });
   };

  logout() {
    this.af.auth.logout();
    this.logService.logConsole("auth service", "logged out user", "");
  };
}
