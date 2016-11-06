import { NgModule } from '@angular/core';

import { ErrorHandlerService } from "./error-handler.service";
import { ErrorDisplayService } from "./error-display.service";

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
  providers: [
      ErrorHandlerService,
      ErrorDisplayService
    ]
})
export class ErrorModule {}
