import { Injectable } from '@angular/core';

@Injectable()
export class ErrorLoggerService {

  constructor() {};

  public log(message: string): void {
    window.alert("Disease Diary Error: \n" + message);
  }
}
