
import { Component} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Rx";

import {ConfigService} from "../shared/config.service";
import {DataService} from "../shared/data.service";
import {LogService} from "../shared/log.service";

@Component({
  templateUrl: './diseaseEvents-edit.component.html'
})
export class DiseaseEventsEditComponent {

  subscription:Subscription;

  patientKey: String;
  diseaseCaseKey: String;
  diseaseCaseName: String;
  diseaseEventKey: String;
  diseaseEventName: String;
  diseaseEventValue: String;

  constructor(private route:ActivatedRoute,
              private dataService: DataService,
              private logService: LogService,
              private location: Location
  ) {

    this.subscription = this.route.params.subscribe(
      (params:any) => {
        this.diseaseEventKey = params['diseaseEventKey'];

        this.diseaseCaseKey = this.route.parent.snapshot.params['diseaseCaseKey'];
        this.logService.logConsole("diseaseEvents-edit", "constructor - diseaseCaseKey", this.diseaseCaseKey);

        this.dataService.getDiseaseCase(this.diseaseCaseKey).subscribe((diseaseCase) => {
          this.patientKey = diseaseCase.patient;
          this.diseaseCaseName = diseaseCase.name;

          this.dataService.getDiseaseEvent(this.diseaseEventKey).subscribe((diseaseCase) => {
            this.diseaseEventName = diseaseCase.name;
            this.diseaseEventValue = diseaseCase.value;
          });
        });
    });
  };

  updateDiseaseEvent(key_value) {
    this.dataService.updateDiseaseEvent(this.diseaseEventKey, key_value)
    this.goBack();
  };
  deleteDiseaseEvent() {
    // delete temporarily deactivated
    //this.dataService.deleteDiseaseEvent(this.diseaseEventKey);
  };

  goBack() {
    this.location.back();
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


