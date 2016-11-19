import { Injectable } from "@angular/core";

import { Observable } from 'rxjs';

import { AngularFire } from 'angularfire2';
import { FirebaseAuthState } from "angularfire2/index";

import { UserLogin } from "./user-login.interface";

import { ConfigService } from "../shared/config.service";
import { LoggedInUserService } from "./logged-in-user.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Injectable()
export class AuthService {

    constructor(public af: AngularFire,
                private loggedInUserService: LoggedInUserService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    registerUser(user: UserLogin) {
        try {
            this.af.auth.createUser({email: user.email, password: user.password})
                .then((auth) => {
                    this.loggedInUserService.setUserData({
                        key  : auth.uid,
                        email: auth.auth.providerData[0].uid,
                        error: ""
                    });

                    // create entry in users - table with auth uid
                    this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).set({
                        name : user.email,
                        admin: false
                    });
                    this.logger.info("[auth service] - registered user uid: " + auth.uid);
                })
                .catch((error) => {
                    this.loggedInUserService.setUserData({key: "", email: "", error: error.message});
                    this.logger.error("[auth service] - register error: " + error.message);
                });
        } catch (e) {
            this.errorHandler.traceError("[auth-service] - registerUser - error", e, true);
        }
    };

    loginUser(user: UserLogin) {
        try {
            this.loggedInUserService.setUserData({key: "", email: "", error: ConfigService.loginProcessMsg});
            this.af.auth.login({email: user.email, password: user.password})
                .then((auth) => {
                    this.loggedInUserService.setUserData({
                        key  : auth.uid,
                        email: auth.auth.providerData[0].uid,
                        error: ""
                    });
                    this.logger.info("[auth service] - logged in user: " + auth.auth.providerData[0].uid + " - " + auth.uid);
                })
                .catch((error) => {
                    this.loggedInUserService.setUserData({key: "", email: "", error: error.message});
                    this.logger.error("[auth service] - login error: " + error.message);
                });
        } catch (e) {
            this.errorHandler.traceError("[auth-service] - loginUser - error", e, true);
        }
    };

    logout() {
        try {
            this.af.auth.logout();
            this.logger.info("[auth service] - logged out user");
        } catch (e) {
            this.errorHandler.traceError("[auth-service] - logout - error", e, true);
        }
    };
}
