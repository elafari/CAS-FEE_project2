import {Injectable} from '@angular/core';

@Injectable()
export class LogService {

  private logActive: boolean;

  constructor() {
    this.logActive = false;
  }

  setLogActive(activated) {
    this.logActive = activated;
  };

  logConsole(module, info, value) {
    console.log("[" + module + "] - " + info + ": " + value);
  };
}