import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoggerModule } from "./log/logger.module";
import { ErrorModule } from "./error/error.module";
import { AuthModule } from './auth/auth.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { UserAdminModule } from './userAdmin/user-admin.module';

import { ConfigService } from "./shared/config.service";
import { DataService } from './shared/data.service';
import { AuthGuard } from './auth/auth.guard';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./shared/header.component";

import { AppRoutingModule, routingComponents } from "./app.routing";

import { AngularFireModule } from 'angularfire2';
import *as firebase from 'firebase';

import { AuthProviders } from "angularfire2/index";
import { AuthMethods } from "angularfire2/index";

@NgModule({
    imports        : [
        AngularFireModule.initializeApp(ConfigService.firebaseConfig, ConfigService.firebaseAuthConfig),
        BrowserModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        LoggerModule,
        ErrorModule,
        AuthModule,
        BreadcrumbModule,
        UserAdminModule
    ],
    declarations   : [
        AppComponent,
        routingComponents,
        HeaderComponent,
    ],
    providers      : [
        ConfigService,
        DataService,
        AuthGuard
    ],
    entryComponents: [AppComponent],
    bootstrap      : [AppComponent]
})

export class AppModule {
}
