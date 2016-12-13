import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';

import { PatientsRoutingModule, routingComponents } from "./patients.routing";

@NgModule({
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        PatientsRoutingModule,
        CalendarModule
    ],
    declarations: [
        routingComponents
    ]
})
export class PatientsModule {
}
