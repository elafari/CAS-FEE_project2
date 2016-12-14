import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DiseaseCasesComponent } from "./diseaseCases.component";
import { DiseaseCasesListComponent } from "./diseaseCases-list.component";
import { DiseaseCasesItemComponent } from "./diseaseCases-item.component";
import { DiseaseCasesEditComponent } from "./diseaseCases-edit.component";
import { DiseaseCasesCreateComponent } from "./diseaseCases-create.component";

export const diseaseCases_routes: Routes = <Routes>[
    {
        path     : '',
        component: DiseaseCasesComponent,
        children : [
            {path: '', component: DiseaseCasesListComponent},
            {path: ':diseaseCaseKey/edit', component: DiseaseCasesEditComponent},
            {path: 'create', component: DiseaseCasesCreateComponent},
            {path: ':diseaseCaseKey/diseaseEvents', loadChildren: 'app/+diseaseEvents/diseaseEvents.module#DiseaseEventsModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(diseaseCases_routes)],
    exports: [RouterModule]
})

export class DiseaseCasesRoutingModule {
}

export const routingComponents = [
    DiseaseCasesComponent,
    DiseaseCasesListComponent,
    DiseaseCasesItemComponent,
    DiseaseCasesEditComponent,
    DiseaseCasesCreateComponent
];
