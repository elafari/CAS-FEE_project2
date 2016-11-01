import { Component, Input, OnInit } from '@angular/core';

import {DataService} from "../shared/data.service";

@Component({
  selector: '[users-item]',
  templateUrl: 'users-item.component.html'
})
export class UsersItemComponent implements OnInit {
  @Input() user: any;

  userKey: String;

  showModalDialogCreate: String;

  constructor(private dataService: DataService){
  };

  ngOnInit() {
    this.userKey = this.user.$key;
  }

  createPatient(key_value) {
    this.showModalDialogCreate = "";
    this.dataService.createPatient(key_value)
  };

  showCreateDialog(dialogAttribute) {
    this.showModalDialogCreate = dialogAttribute;
  };
}

