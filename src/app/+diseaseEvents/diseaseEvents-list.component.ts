import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { AuthService } from "../auth/auth.service";
import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl: './diseaseEvents-list.component.html',
    styleUrls  : ['../../assets/scss/cards.scss']
})
export class DiseaseEventsListComponent implements OnInit, OnDestroy {

    diseaseCaseKey: string;
    diseaseCaseName: string;

    allDiseaseEvents: Observable<any[]>;
    diseaseEventsCount: Number;

    subscrUser: Subscription;
    subscrRoute: Subscription;
    subscrDiseaseCase: Subscription;
    subscrDiseaseEvents: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        try {
            this.subscrUser = this.authService.user$.subscribe(
                (user: UserClass) => {
                    if (user.isLoggedIn()) {
                        this.subscrRoute = this.route.params.subscribe(
                            (params: any) => {
                                this.diseaseCaseKey = params['diseaseCaseKey'];
                                this.subscrDiseaseCase = this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                                    this.diseaseCaseName = diseaseCase.name;
                                    this.allDiseaseEvents = this.dataService.getDiseaseEvents(this.diseaseCaseKey);
                                    if (this.allDiseaseEvents) {
                                        this.subscrDiseaseEvents = this.allDiseaseEvents.subscribe((queriedItems) => {
                                            this.diseaseEventsCount = queriedItems.length;
                                        });
                                        this.dataService.addSubscripton(this.subscrDiseaseEvents);
                                    }
                                });
                                this.dataService.addSubscripton(this.subscrDiseaseCase);
                            });
                    } else {
                        this.logger.warn("[diseaseEvents-list] - ngOnInit - user: no logged in user");
                        this.router.navigate(['/login']);
                    }
                }
            );
            this.dataService.addSubscripton(this.subscrUser);
        } catch (e) {
            this.errorHandler.traceError("[diseaseEvents-list] - ngOnInit - error", e, true);
        }
    };

    ngOnDestroy() {
        if (this.subscrDiseaseEvents) this.subscrDiseaseEvents.unsubscribe();
        if (this.subscrDiseaseCase) this.subscrDiseaseCase.unsubscribe();
        if (this.subscrRoute) this.subscrRoute.unsubscribe();
        if (this.subscrUser) this.subscrUser.unsubscribe();
    };
}
