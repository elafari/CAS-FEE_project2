import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from "primeng/components/calendar/calendar";

import { DiseaseEventsRoutingModule, routingComponents } from "./diseaseEvents.routing";

@NgModule({
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        DiseaseEventsRoutingModule,
        CalendarModule
    ],
    declarations: [
        routingComponents
    ]
})
export class DiseaseEventsModule {
}
