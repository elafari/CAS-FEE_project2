import { Injectable } from "@angular/core";
import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from "rxjs";

import { User, Login, Registration } from "./user.interface";
import { DataService } from "../shared/data.service";
import { ConfigService } from "../shared/config.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Injectable()
export class AuthService {

    public userData: BehaviorSubject<User> = new BehaviorSubject<User>(this.prepareUserData(null, ConfigService.loginProcessMsg));

    constructor(private af: AngularFire,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {

        this.af.auth.subscribe(
            (auth) => {
                let userData: User = this.prepareUserData(auth);
                if (!auth) return;

                this.dataService.getUser(auth.uid).subscribe(
                    (user) => {
                        userData.name = user.name;
                        userData.isAdmin = user.admin;
                        this.logger.info("[auth service] - constructor - user: " + user.name + ' admin: ' + user.admin);
                        this.setUserData(userData)
                    },
                    (e) => {
                        this.errorHandler.traceError("[auth service] - constructor - error: ", e, true);
                    }
                );
            },
            (error) => this.logger.error("[auth service] - constructor - error: " + error.message)
        );
    };

    loginUser(user: Login) {
        try {
            //this.setUserData(this.prepareUserData(null, ConfigService.loginProcessMsg));

            this.af.auth.login({email: user.email, password: user.password})
                .then((auth) => {
                    let userData: User = this.prepareUserData(auth);
                    if (!auth) return;

                    this.dataService.getUser(auth.uid).subscribe(
                        (user) => {
                            userData.name = user.name;
                            userData.isAdmin = user.admin;
                            this.logger.info("[auth service] - constructor - user: " + user.name + ' admin: ' + user.admin);
                            this.setUserData(userData)
                        },
                        (e) => {
                            this.errorHandler.traceError("[auth service] - constructor - error: ", e, true);
                        }
                    );

                    //this.dataService.addSubscripton(this.subscrUser);
                    this.logger.info("[auth service] - logged in user: " + auth.auth.providerData[0].uid + " - " + auth.uid);
                })
                .catch((error) => {
                    this.setUserData(this.prepareUserData(null, error.message));
                    this.logger.error("[auth service] - login error: " + error.message);
                });
        } catch (e) {
            this.errorHandler.traceError("[auth-service] - loginUser - error", e, true);
        }
    };

    registerUser(user: Registration) {
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

    logout() {
        try {
            this.af.auth.logout();
            this.logger.info("[auth service] - logged out user");
        } catch (e) {
            this.errorHandler.traceError("[auth-service] - logout - error", e, true);
        }
    };

    private prepareUserData(auth: any = null, errorMsg: string = ''): User {
        return {
            key  : auth ? auth.uid : '',
            email: auth ? auth.auth.providerData[0].email : '',
            error: errorMsg
        };
    }

    public setUserData(user: User) {
        this.userData.next(user);
    };
}
