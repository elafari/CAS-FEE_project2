import { Component, Input, OnInit } from '@angular/core';

import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  selector: '[users-patient]',
  templateUrl: 'users-patient.component.html',
  styleUrls: ['../../assets/scss/cards.scss']
})
export class UsersPatientComponent implements OnInit {
  @Input() user: any;
  @Input() patient: any;

  patientKey: String;

  showModalDialogDelete: String;
  simulateDeletion: boolean;

  constructor(private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService){
  };

  ngOnInit(){
    try {
      this.simulateDeletion = true;
      this.patientKey = this.patient.$key;
    } catch(e) {
      this.errorHandler.traceError("[users-patient] - ngOnInit - error", e, true);
    }
  }

  deletePatient(simulate) {
    try {
      this.showModalDialogDelete = "";
      this.logger.info("[user-patient] - deletePatient - patient: " + this.patient.$key + " - simulation: " + simulate);
      this.dataService.deletePatient(this.patient.$key, simulate);
    } catch(e) {
      this.errorHandler.traceError("[users-patient] - deletePatient - error", e, true);
    }
  };

  showDeleteDialog(dialogAttribute) {
    this.simulateDeletion = true;
    this.showModalDialogDelete = dialogAttribute;
  };
}

