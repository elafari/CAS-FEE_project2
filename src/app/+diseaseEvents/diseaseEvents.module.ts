import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DiseaseEventsRoutingModule, routingComponents } from "./diseaseEvents.routing";

@NgModule({
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        DiseaseEventsRoutingModule
    ],
    declarations: [
        routingComponents
    ]
})
export class DiseaseEventsModule {
}
