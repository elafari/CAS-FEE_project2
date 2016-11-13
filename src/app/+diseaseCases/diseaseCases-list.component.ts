import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs';

import { AngularFire } from 'angularfire2';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  templateUrl: './diseaseCases-list.component.html',
  styleUrls: ['../../assets/scss/cards.scss']
})
export class DiseaseCasesListComponent implements OnInit{

  patientKey: String;
  patientName: String;

  allDiseaseCases: Observable<any[]>;
  diseaseCasesCount: Number;

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
              this.patientKey = params['patientKey'];
              this.dataService.getPatient(this.patientKey).subscribe((patient) => {
                this.patientName = patient.name;
                this.allDiseaseCases = this.dataService.getDiseaseCases(this.patientKey);
                if (this.allDiseaseCases) {
                  this.allDiseaseCases.subscribe((queriedItems) => {
                    this.diseaseCasesCount = queriedItems.length;
                  });
                }
              });
            });
        } else {
          this.logger.warn("[diseaseCases-list] - ngOnInit - user: no logged in user");
          this.router.navigate(['/']);
        }
      });
    } catch(e) {
      this.errorHandler.traceError("[diseaseCases-list] - ngOnInit - error", e, true);
    }
  };
}
