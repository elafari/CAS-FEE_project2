import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PatientsComponent } from "./patients.component";
import { PatientsListComponent } from "./patients-list.component";
import { PatientsItemComponent } from "./patients-item.component";
import { PatientsEditComponent } from "./patients-edit.component";
import { PatientsCreateComponent } from "./patients-create.component";
import { AuthResolver } from "../auth/auth.resolver";
import { AuthGuard } from "../auth/auth.guard";

export const patients_routes: Routes = <Routes>[
    {
        path     : '',
        component: PatientsComponent,
        children : [
            {
                path     : '',
                component: PatientsListComponent
            },
            {
                path     : ':patientKey/edit',
                component: PatientsEditComponent
            },
            {
                path       : 'create',
                component  : PatientsCreateComponent,
                resolve    : {
                    foo: AuthResolver
                }
            },
            {
                path        : ':patientKey/diseaseCases',
                loadChildren: 'app/+diseaseCases/diseaseCases.module#DiseaseCasesModule'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(patients_routes)],
    exports: [RouterModule]
})

export class PatientsRoutingModule {
}

export const routingComponents = [
    PatientsComponent,
    PatientsListComponent,
    PatientsItemComponent,
    PatientsEditComponent,
    PatientsCreateComponent
];
