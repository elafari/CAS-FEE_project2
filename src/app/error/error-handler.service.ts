import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from "@angular/router";

import { ErrorDisplayService } from './error-display.service';
import { LoggerService } from "../log/logger.service";

@Injectable()
export class ErrorHandlerService extends ErrorHandler {
    constructor(private router: Router,
                private logger: LoggerService,
                private errorDisplayService: ErrorDisplayService) {
        super(true);
    }

    traceError(logMessage: string, exeption: any, routeHome?: boolean) {
        // logging
        this.logger.error(logMessage + ": " + exeption.message);

        // routing
        if (routeHome) {
            this.router.navigate(['/']);
        }

        // standard error handler
        this.handleError(exeption);
    };

    handleError(exception: any) {
        if (exception.message && exception.message.length > 0) {
            this.errorDisplayService.displayError(exception.message);
        } else {
            this.errorDisplayService.displayError('Here is a not identified error!');
        }
        super.handleError(exception);
    }
}
