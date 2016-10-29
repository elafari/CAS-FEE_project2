import { Component, Input, OnInit } from '@angular/core'; //, AfterViewInit, ViewChild
import { Router } from "@angular/router";

import {DataService} from "../shared/data.service";

@Component({
  selector: '[users-item]',
  templateUrl: 'users-item.component.html'
})
export class UsersItemComponent implements OnInit {
  @Input() user: any;

  userKey: String;

  constructor(private router: Router,
              private dataService: DataService){
  };

  ngOnInit() {
    this.userKey = this.user.$key;
  }

  createPatient(key_value) {
    this.dataService.createPatient(key_value)
  };
}

