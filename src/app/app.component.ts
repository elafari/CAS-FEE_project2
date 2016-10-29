import { Component } from "@angular/core";

import { AngularFire } from 'angularfire2';

import { ConfigService } from './shared/config.service';
import { LogService } from "./shared/log.service";

@Component({
  selector: 'app-disease',
  templateUrl: 'app.component.html'
})
export class AppComponent{

  constructor(private af: AngularFire,
              private logService: LogService
  ){
    this.logService.setLogActive(ConfigService.logFlag);
  };
}
