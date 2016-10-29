import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs';

import {DataService} from "../shared/data.service";

@Component({
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {

  allUsers: Observable<any[]>;
  allUsersCount: Number;

  constructor(private dataService: DataService) {

    this.allUsers = this.dataService.getAllUsersAndPatients();
    this.allUsers.subscribe((queriedItems) => {this.allUsersCount = queriedItems.length});
  }
}

