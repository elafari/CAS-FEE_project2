import { Injectable } from '@angular/core';

@Injectable()
export class ErrorDisplayService {

  constructor() {};

  public displayError(message: string): void {
    window.alert("Disease Diary Error: \n" + message);
  }
}
