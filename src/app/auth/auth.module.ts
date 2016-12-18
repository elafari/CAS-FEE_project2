import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from "@angular/router";

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports     : [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports     : [
        LoginComponent,
        RegisterComponent
    ],
    providers   : [
        AuthService,
        AuthGuard
    ]
})
export class AuthModule {
}
