import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class AuthResolver implements Resolve<any> {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    resolve() {
        return this.authService.isLoggedIn();

        /*
        return this.authService.getAuth().map(user => {
            debugger;
            return !!user;
        }).first();*/
/*
        return this.authService.getAuth().map(auth => {
            if (!auth) {
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }).first()*/
    }
}
