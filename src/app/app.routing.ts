import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./pages/home.component";
import { LoginComponent } from "./auth/login.component";
import { RegisterComponent } from "./auth/register.component";
import { ErrorComponent } from "./pages/error.component";
import { LoggedInDataComponent } from "./pages/logged-in-data.component";
import { LinkListComponent } from "./pages/link-list.component";
import { UserAdminComponent } from "./userAdmin/user-admin.component";
import { NotFoundComponent } from "./pages/not-found.component";
import { AuthGuard } from "./auth/auth.guard";

export const app_routes: Routes = <Routes>[
    {path: '', component: HomeComponent},

    {path: 'home', component: HomeComponent},

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    {path: 'error', component: ErrorComponent},

    {
        path       : 'loggedInData',
        component  : LoggedInDataComponent,
        canActivate: [AuthGuard]
    },
    {
        path       : 'linkList',
        component  : LinkListComponent,
        canActivate: [AuthGuard]
    },

    {
        path       : 'userAdmin',
        component  : UserAdminComponent,
        canActivate: [AuthGuard]
    },

    {
        path        : 'users',
        loadChildren: 'app/+users/users.module#UsersModule',
        canActivate : [AuthGuard]
    },
    {
        path        : 'patients',
        loadChildren: 'app/+patients/patients.module#PatientsModule',
        canActivate : [AuthGuard]
    },
    {
        path     : '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(app_routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}

export const routingComponents = [
    HomeComponent,
    ErrorComponent,
    LoggedInDataComponent,
    LinkListComponent,
    NotFoundComponent
];
