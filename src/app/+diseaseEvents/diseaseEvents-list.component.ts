import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl: './diseaseEvents-list.component.html',
    styleUrls  : [
        '../../assets/scss/cards.scss',
        '../../assets/scss/tables.scss'
    ]
})
export class DiseaseEventsListComponent implements OnInit, OnDestroy {

    diseaseCaseKey: string;
    diseaseCaseName: string;

    allDiseaseEvents: Observable<any[]>;
    diseaseEventsCount: Number;

    subscrRoute: Subscription;
    subscrDiseaseCase: Subscription;
    subscrDiseaseEvents: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private dataService: DataService,
                private errorHandler: ErrorHandlerService) {
    };

    ngOnInit() {
        try {
            this.subscrRoute = this.route.params.subscribe(
                (params: any) => {
                    this.diseaseCaseKey = params['diseaseCaseKey'];
                    this.subscrDiseaseCase = this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                        this.diseaseCaseName = diseaseCase.name;
                        this.allDiseaseEvents = this.dataService.getDiseaseEvents(this.diseaseCaseKey);
                        if (this.allDiseaseEvents) {
                            this.subscrDiseaseEvents = this.allDiseaseEvents.subscribe(
                                (queriedItems) => {
                                    this.diseaseEventsCount = queriedItems.length;
                                }
                            );
                            this.dataService.addSubscripton(this.subscrDiseaseEvents);
                        }
                    });
                    this.dataService.addSubscripton(this.subscrDiseaseCase);
                });
        } catch (e) {
            this.errorHandler.traceError("[diseaseEvents-list] - ngOnInit - error", e, true);
        }
    };

    ngOnDestroy() {
        if (this.subscrDiseaseEvents) this.subscrDiseaseEvents.unsubscribe();
        if (this.subscrDiseaseCase) this.subscrDiseaseCase.unsubscribe();
        if (this.subscrRoute) this.subscrRoute.unsubscribe();
    };
}
