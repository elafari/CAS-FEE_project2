import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DiseaseEventsComponent } from "./diseaseEvents.component";
import { DiseaseEventsListComponent } from "./diseaseEvents-list.component";
import { DiseaseEventsItemComponent } from "./diseaseEvents-item.component";
import { DiseaseEventsEditComponent } from "./diseaseEvents-edit.component";
import { DiseaseEventsCreateComponent } from "./diseaseEvents-create.component";

export const diseaseEvents_routes: Routes = [
  { path: '', component: DiseaseEventsComponent, children: [
    { path: '', component: DiseaseEventsListComponent },
    { path: ':diseaseEventKey/edit', component: DiseaseEventsEditComponent },
    { path: 'create', component: DiseaseEventsCreateComponent }
  ]}
];

@NgModule ({
  imports: [RouterModule.forChild(diseaseEvents_routes)],
  exports: [RouterModule]
})

export class DiseaseEventsRoutingModule{}

export const routingComponents = [
  DiseaseEventsComponent,
  DiseaseEventsListComponent,
  DiseaseEventsItemComponent,
  DiseaseEventsEditComponent,
  DiseaseEventsCreateComponent
];

