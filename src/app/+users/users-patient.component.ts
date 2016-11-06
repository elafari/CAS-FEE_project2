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

  isSuccessVisible: boolean;
  isWarningVisible: boolean;

  patientKey: String;

  showModalDialogEdit: String;

  constructor(private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService){
  };

  ngOnInit(){
    try {
      // todo:
      // card einfärben: patient with active cases, or closed cases
      // function for checking cases -> or feature stripping :)
      this.isSuccessVisible = true;

      this.isWarningVisible = this.checkPatientStatus();

      this.patientKey = this.patient.$key;
    } catch(e) {
      this.errorHandler.traceError("[users-patient] - ngOnInit - error", e, true);
    }
  }

  updatePatient(key_value) {
    try {
      this.showModalDialogEdit = "";
      this.dataService.updatePatient(this.patient.$key, key_value);
    } catch(e) {
      this.errorHandler.traceError("[users-patient] - updatePatient - error", e, true);
    }
  };

  deletePatient() {
    try {
      this.showModalDialogEdit = "";

      //this.dataService.deletePatient(this.patient.$key);

    } catch(e) {
      this.errorHandler.traceError("[users-patient] - deletePatient - error", e, true);
    }
  };

  checkPatientStatus() {
    // checking case status of patient
    return false;
  };

  showEditDialog(dialogAttribute) {
    this.showModalDialogEdit = dialogAttribute;
  };
}

