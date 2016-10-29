import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DiseaseCasesRoutingModule, routingComponents} from "./diseaseCases.routing";

@NgModule({
    imports: [
      CommonModule,
      DiseaseCasesRoutingModule
    ],
    declarations: [
      routingComponents
    ]
})
export class DiseaseCasesModule {}
