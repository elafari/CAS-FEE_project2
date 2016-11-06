import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs';

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './diseaseEvents-list.component.html'
})
export class DiseaseEventsListComponent implements OnInit{

  diseaseCaseKey: String;
  diseaseCaseName: String;

  allDiseaseEvents: Observable<any[]>;
  diseaseEventsCount: Number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private af: AngularFire,
              private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService) {
  };

  ngOnInit() {
    try {
      this.af.auth.subscribe(auth => {
        if (auth) {
          this.route.params.subscribe(
            (params:any) => {
              this.diseaseCaseKey = params['diseaseCaseKey'];
              this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
                 this.diseaseCaseName = diseaseCase.name;
                  this.allDiseaseEvents = this.dataService.getDiseaseEvents(this.diseaseCaseKey);
                 if (this.allDiseaseEvents) {
                   this.allDiseaseEvents.subscribe((queriedItems) => {
                     this.diseaseEventsCount = queriedItems.length;
                   });
                 }
               });
            });
        } else {
          this.logger.warn("[diseaseEvents-list] - ngOnInit - user: no logged in user");
          this.router.navigate(['/']);
        }
      });
    } catch(e) {
      this.errorHandler.traceError("[diseaseEvents-list] - ngOnInit - error", e, true);
    }
  };
}
