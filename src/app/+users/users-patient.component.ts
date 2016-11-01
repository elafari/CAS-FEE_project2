import { Component, Input, OnInit } from '@angular/core';

import { DataService } from "../shared/data.service";

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

  constructor(private dataService: DataService){

    // todo:
    // card einfärben: patient with active cases, or closed cases
    // function for checking cases -> or feature stripping :)
    this.isSuccessVisible = true;

    this.isWarningVisible = this.checkPatientStatus();

  };

  ngOnInit(){
    this.patientKey = this.patient.$key;
  }

  updatePatient(key_value) {
    this.showModalDialogEdit = "";
    this.dataService.updatePatient(this.patient.$key, key_value);
  };

  deletePatient() {
    this.showModalDialogEdit = "";
    //this.dataService.deletePatient(this.patient.$key);
  };

  checkPatientStatus() {
    // checking case status of patient
    return false;
  };

  showEditDialog(dialogAttribute) {
    this.showModalDialogEdit = dialogAttribute;
  };

}

