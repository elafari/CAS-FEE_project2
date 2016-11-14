import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PatientsRoutingModule, routingComponents } from "./patients.routing";

@NgModule({
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        PatientsRoutingModule
    ],
    declarations: [
        routingComponents
    ]
})
export class PatientsModule {
}
