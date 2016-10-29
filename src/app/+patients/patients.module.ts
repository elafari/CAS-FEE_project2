import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule, routingComponents } from "./patients.routing";

@NgModule({
    imports: [
      CommonModule,
      PatientsRoutingModule
    ],
    declarations: [
      routingComponents
    ]
})
export class PatientsModule {}
