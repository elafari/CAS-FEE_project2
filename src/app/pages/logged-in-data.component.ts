import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "../auth/auth.service";
import { DataService } from "../shared/data.service";

@Component({
    templateUrl: './logged-in-data.component.html',
    styleUrls  : ['../../assets/scss/tables.scss']
})

export class LoggedInDataComponent implements OnInit, OnDestroy {

    loggedInUserData: any[];

    subscrUser: Subscription;
    subscrDbUser: Subscription;

    constructor(private authService: AuthService,
                private dataService: DataService) {
    };

    ngOnInit() {
        this.subscrUser = this.authService.user$.subscribe(user => {

            this.subscrDbUser = this.dataService.getUser(user.key).subscribe((dbUser) => {
                this.loggedInUserData = [
                    {
                        key  : "user key",
                        value: dbUser.$key
                    },
                    {
                        key  : "name (email)",
                        value: dbUser.name
                    },
                    {
                        key  : "admin role",
                        value: dbUser.admin
                    }
                ];
            });

            this.dataService.addSubscripton(this.subscrDbUser);
        });

        this.dataService.addSubscripton(this.subscrUser);
    };

    ngOnDestroy() {
        if (this.subscrUser) this.subscrUser.unsubscribe();
        if (this.subscrDbUser) this.subscrDbUser.unsubscribe();
    };
}
