import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/Rx";

import { ConfigService } from "../shared/config.service";
import { User } from "./user.interface";

@Injectable()
export class LoggedInUserService {

    public userData: BehaviorSubject<User> = new BehaviorSubject<User>({
        key  : "",
        email: "",
        error: ConfigService.loginProcessMsg
    });

    setUserData(user: User) {
        this.userData.next(user);
    };
}
