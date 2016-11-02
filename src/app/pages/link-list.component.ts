import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from "../shared/config.service";

@Component({
  templateUrl: './link-list.component.html'
})

export class LinkListComponent{
  linkList: any[];
  constructor() {
    this.linkList = ConfigService.linkList;
  }
}
