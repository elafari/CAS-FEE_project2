import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import { AuthService } from './auth.service';
import { LoggerService } from "../log/logger.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router,
                private logger: LoggerService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                routerState: RouterStateSnapshot): Observable <boolean> {

        return this.authService.getAuth()
            .map(auth => {
                if (!auth) {
                    this.logger.warn("[AuthGuard] - no logged in user (Route:" + routerState.url + ")");
                    this.router.navigate(['/login']);
                    return false;
                } else {
                    return true;
                }
            })
            .first();
    }
}
