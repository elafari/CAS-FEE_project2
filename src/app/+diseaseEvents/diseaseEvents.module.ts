import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DiseaseEventsRoutingModule, routingComponents} from "./diseaseEvents.routing";

@NgModule({
    imports: [
      CommonModule,
      DiseaseEventsRoutingModule
    ],
    declarations: [
      routingComponents
    ]
})
export class DiseaseEventsModule {}
