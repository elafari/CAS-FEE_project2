import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {DiseaseCasesRoutingModule, routingComponents} from "./diseaseCases.routing";

@NgModule({
    imports: [
      CommonModule,
        ReactiveFormsModule,
      DiseaseCasesRoutingModule
    ],
    declarations: [
      routingComponents
    ]
})
export class DiseaseCasesModule {}
