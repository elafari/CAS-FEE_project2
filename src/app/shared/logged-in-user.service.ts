import { Injectable } from '@angular/core';

import { Subject } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/Rx";

import { ConfigService } from "./config.service";
import { LoggedInUser } from "./logged-in-user.interface";

@Injectable()
export class LoggedInUserService {

  public userData: Subject<LoggedInUser> = new BehaviorSubject<LoggedInUser>({key: "", email: "", error: ConfigService.loginProcessMsg});

  setUserData(user:LoggedInUser) {
    this.userData.next(user);
  }

}
