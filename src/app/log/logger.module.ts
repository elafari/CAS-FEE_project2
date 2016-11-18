import { NgModule } from '@angular/core';

import { LoggerConsoleService } from "./logger-console.service";
import { LoggerService } from "./logger.service";

@NgModule({
    declarations: [],
    imports     : [],
    exports     : [],
    providers   : [
        {
            provide : LoggerService,
            useClass: LoggerConsoleService
        }
    ]
})
export class LoggerModule {
}
