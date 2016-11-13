import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './diseaseCases-list.component.html',
  styleUrls: ['../../assets/scss/cards.scss']
})
export class DiseaseCasesListComponent implements OnInit, OnDestroy{

  patientKey: String;
  patientName: String;

  allDiseaseCases: Observable<any[]>;
  diseaseCasesCount: Number;

  subscrRoute: Subscription;
  subscrPatient: Subscription;
  subscrDiseaseCases: Subscription;

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
          this.subscrRoute = this.route.params.subscribe(
            (params:any) => {
              this.patientKey = params['patientKey'];
              this.subscrPatient = this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                this.patientName = patient.name;
                this.allDiseaseCases = this.dataService.getDiseaseCases(this.patientKey);
                if (this.allDiseaseCases) {
                  this.subscrDiseaseCases = this.allDiseaseCases.subscribe((queriedItems) => {
                    this.diseaseCasesCount = queriedItems.length;
                  });
                  this.dataService.addSubscripton(this.subscrDiseaseCases);
                }
              });
              this.dataService.addSubscripton(this.subscrPatient);
            });
        } else {
          this.logger.warn("[diseaseCases-list] - ngOnInit - user: no logged in user");
          this.router.navigate(['/login']);
        }
      });
    } catch(e) {
      this.errorHandler.traceError("[diseaseCases-list] - ngOnInit - error", e, true);
    }
  };

  ngOnDestroy() {
    if (this.subscrDiseaseCases) {this.subscrDiseaseCases.unsubscribe();}
    if (this.subscrPatient) {this.subscrPatient.unsubscribe();}
    if (this.subscrRoute) {this.subscrRoute.unsubscribe();}
  };
}
