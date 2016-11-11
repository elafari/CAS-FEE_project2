import { Component, Input, OnInit } from '@angular/core';

import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  selector: '[users-patient]',
  templateUrl: 'users-patient.component.html'
})
export class UsersPatientComponent implements OnInit {
  @Input() user: any;
  @Input() patient: any;

  patientKey: String;

  showModalDialogDelete: String;

  constructor(private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService){
  };

  ngOnInit(){
    try {
      this.patientKey = this.patient.$key;
    } catch(e) {
      this.errorHandler.traceError("[users-patient] - ngOnInit - error", e, true);
    }
  }

  deletePatient() {
    try {
      this.showModalDialogDelete = "";

      //alert("Delete temporarily deactivated!");
      this.dataService.deletePatient(this.patient.$key);

    } catch(e) {
      this.errorHandler.traceError("[users-patient] - deletePatient - error", e, true);
    }
  };

  showDeleteDialog(dialogAttribute) {
    this.showModalDialogDelete = dialogAttribute;
  };
}

