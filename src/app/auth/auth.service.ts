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
    public user: BehaviorSubject<UserClass> = new BehaviorSubject<UserClass>(this.userData);

    private authSubscription: Subscription;
    private dbSubscription: Subscription;

    constructor(private af: AngularFire,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {

        //@todo: move this to onInit()
        this.authSubscription = this.af.auth.subscribe(
            (auth) => {
                if (auth) {
                    this.userData = new UserClass({
                        key  : auth.uid,
                        email: auth.auth.providerData[0].email,
                    });

                    this.dbSubscription = this.dataService.getUser(auth.uid).subscribe(
                        (dbUser) => {
                            this.userData.name = dbUser.name;
                            this.userData.isAdmin = dbUser.admin;
                            this.logger.info("[auth service] - constructor - user: " + dbUser.name + ' admin: ' + dbUser.admin);
                            this.setUserData(this.userData)
                        },
                        (e) => {
                            this.errorHandler.traceError("[auth service] - constructor - error: ", e, true);
                        }
                    );
                } else {
                    if (this.userData.isLoggedIn()) {
                        this.userData = new UserClass({error: ConfigService.loginProcessMsg});
                        this.setUserData(this.userData);
                    }
                }
            },
            (error) => this.logger.error("[auth service] - constructor - error: " + error.message)
        );
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
            if (this.dbSubscription) this.dbSubscription.unsubscribe();
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
                    // create entry in users - table with auth uid
                    this.af.database.object(ConfigService.firebaseDbConfig.db + ConfigService.firebaseDbConfig.users + '/' + auth.uid).set({
                        name : user.email,
                        admin: false
                    });
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
        this.user.next(userData);
    };
}
