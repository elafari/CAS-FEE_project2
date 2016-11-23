import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { UsersComponent } from "./users.component";
import { UsersListComponent } from "./users-list.component";
import { UsersPatientComponent } from './users-patient.component';

export const users_routes: Routes = <Routes>[
    {
        path     : '',
        component: UsersComponent,
        children : [
            {
                path     : '',
                component: UsersListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(users_routes)],
    exports: [RouterModule]
})

export class UsersRoutingModule {
}

export const routingComponents = [
    UsersComponent,
    UsersListComponent,
    UsersPatientComponent
];
