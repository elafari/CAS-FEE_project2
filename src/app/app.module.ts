import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./pages/header.component";

import { AuthModule } from './auth/auth.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { UserAdminModule } from './userAdmin/user-admin.module';

import { ConfigService } from "./shared/config.service";
import { DataService } from './shared/data.service';
import { LoggedInUserService } from "./auth/logged-in-user.service";
import { ErrorHandlerService } from "./shared/error-handler.service";
import { ErrorLoggerService } from "./shared/error-logger.service";
import { LogService } from "./shared/log.service";

import { AppRoutingModule, routingComponents } from "./app.routing";

import { AngularFireModule } from 'angularfire2';
import *as firebase from 'firebase';

import { AuthProviders } from "angularfire2/index";
import { AuthMethods } from "angularfire2/index";

@NgModule({
  imports: [
    AngularFireModule.initializeApp(ConfigService.firebaseConfig, ConfigService.firebaseAuthConfig),
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    AuthModule,
    BreadcrumbModule,
    UserAdminModule
  ],
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
  ],
  providers: [
    ConfigService,
    DataService,
    LoggedInUserService,
    ErrorHandlerService,
    ErrorLoggerService,
    LogService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {

}
