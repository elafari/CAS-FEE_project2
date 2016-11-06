import { Component, Input, OnInit } from '@angular/core';

import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
  selector: '[users-item]',
  templateUrl: 'users-item.component.html'
})
export class UsersItemComponent implements OnInit {
  @Input() user: any;

  userKey: String;

  showModalDialogCreate: String;

  constructor(private dataService: DataService,
              private errorHandler: ErrorHandlerService,
              private logger: LoggerService){
  };

  ngOnInit() {
    this.userKey = this.user.$key;
  }

  createPatient(key_value) {
    try {
      this.showModalDialogCreate = "";
      this.dataService.createPatient(key_value)
    } catch(e) {
      this.errorHandler.traceError("[users-item] - createPatient - error", e, true);
    }
  };

  showCreateDialog(dialogAttribute) {
    this.showModalDialogCreate = dialogAttribute;
  };
}

