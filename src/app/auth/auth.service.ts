import { Injectable } from "@angular/core";
import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from "rxjs";
import { Subscription } from "rxjs/Subscription";

import { UserClass, Login, Registration } from "./user.interface";
import { DataService } from "../shared/data.service";
import { ConfigService } from "../shared/config.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Injectable()
export class AuthService {

    private userData: UserClass = new UserClass({error: ConfigService.loginProcessMsg});
    user$: BehaviorSubject<UserClass> = new BehaviorSubject<UserClass>(this.userData);
    private subscrUser: Subscription;

    constructor(private af: AngularFire,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {

        try {
            this.af.auth.subscribe(
                (auth) => {
                    if (auth) {
                        this.userData = new UserClass({
                            key  : auth.uid,
                            email: auth.auth.providerData[0].email
                        });

                        this.setUserData(this.userData);

                        this.subscrUser = this.dataService.getUser(auth.uid).subscribe(
                            (dbUser) => {
                                this.userData.name = dbUser.name;
                                this.userData.isAdmin = dbUser.admin;
                                this.userData.active = dbUser.active;
                                this.logger.info("[auth service] - constructor - user extended: " + dbUser.name + ' admin: ' + dbUser.admin + ' active: ' + dbUser.active);
                                if (dbUser.active === true) {
                                    this.setUserData(this.userData);
                                } else {
                                    this.logger.error("[auth service] - constructor - user deactivated: " + dbUser.name + ' admin: ' + dbUser.admin + ' active: ' + dbUser.active);
                                    this.userData = new UserClass({
                                        key   : "",
                                        name  : "",
                                        admin : false,
                                        active: false,
                                        error : ConfigService.loginDeactivatedMsg
                                    });
                                    this.setUserData(this.userData);
                                }
                            },
                            (e) => {
                                this.errorHandler.traceError("[auth service] - constructor - error - dbUser: ", e, true);
                            }
                        );

                        this.dataService.addSubscripton(this.subscrUser);
                    } else {
                        if (this.userData.isLoggedIn()) {
                            this.userData = new UserClass({error: ConfigService.loginProcessMsg});
                            this.setUserData(this.userData);
                        }
                    }
                },
                (error) => this.logger.error("[auth service] - constructor - error - auth: " + error.message)
            );
        } catch (e) {
            this.errorHandler.traceError("[auth-service] - constructor - error - catch", e, true);
        }
    };

    loginUser(user: Login) {
        try {
            this.af.auth.login({email: user.email, password: user.password})
                .then((auth) => {
                    this.logger.info("[auth service] - logged in user: " + auth.auth.providerData[0].uid + " - " + auth.uid);
                })
                .catch((error) => {
                    this.userData = new UserClass({error: error.message});
                    this.setUserData(this.userData);
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

    registerUser(user: Registration) {
        try {
            this.af.auth.createUser({email: user.email, password: user.password})
                .then((auth) => {
                    this.dataService.createUser(auth.uid, user.email);
                    this.logger.info("[auth service] - registered user uid: " + auth.uid);
                })
                .catch((error) => {
                    this.userData = new UserClass({error: error.message});
                    this.setUserData(this.userData);
                    this.logger.error("[auth service] - register error: " + error.message);
                });
        } catch (e) {
            this.errorHandler.traceError("[auth-service] - registerUser - error", e, true);
        }
    };

    private setUserData(userData: UserClass) {
        this.user$.next(userData);
    };

    resetUserData() {
        let resetData = new UserClass({error: ConfigService.loginProcessMsg});
        this.user$.next(resetData);
    };
}
