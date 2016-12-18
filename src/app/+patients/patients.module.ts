import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';

import { PatientsRoutingModule, routingComponents } from "./patients.routing";
import { AuthGuard } from "../auth/auth.guard";

@NgModule({
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        PatientsRoutingModule,
        CalendarModule
    ],
    declarations: [
        routingComponents
    ],
    providers: [
        AuthGuard
    ]
})
export class PatientsModule {
}
