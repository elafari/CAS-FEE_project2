import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "../auth/auth.service";
import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl: './patients-list.component.html',
    styleUrls  : ['../../assets/scss/cards.scss']
})
export class PatientsListComponent implements OnInit, OnDestroy {

    loggedInUserName: string;

    allPatients: Observable<any[]>;
    patientsCount: Number;

    subscrUser: Subscription;
    subscrPatients: Subscription;

    constructor(private router: Router,
                private authService: AuthService,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        try {
            this.subscrUser = this.authService.user$.subscribe(user => {
                this.loggedInUserName = user.name;
                this.logger.info("[patients-list] - ngOnInit - user: " + user.name);
                this.allPatients = this.dataService.getPatients(user.key);
                if (this.allPatients) {
                    this.subscrPatients = this.allPatients.subscribe((queriedItems) => {
                        this.patientsCount = queriedItems.length;
                    });
                    this.dataService.addSubscripton(this.subscrPatients);
                }
            });
            this.dataService.addSubscripton(this.subscrUser);
        }
        catch (e) {
            this.errorHandler.traceError("[patients-list] - ngOnInit - error", e, true);
        }
    };

    ngOnDestroy() {
        if (this.subscrPatients) this.subscrPatients.unsubscribe();
        if (this.subscrUser) this.subscrUser.unsubscribe();
    };
}
