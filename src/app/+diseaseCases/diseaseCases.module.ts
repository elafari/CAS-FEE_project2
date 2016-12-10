import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';

import { DiseaseCasesRoutingModule, routingComponents } from "./diseaseCases.routing";

@NgModule({
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        DiseaseCasesRoutingModule,
        CalendarModule
    ],
    declarations: [
        routingComponents
    ]
})
export class DiseaseCasesModule {
}
