import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UsersRoutingModule, routingComponents} from "./users.routing";

@NgModule({
    imports: [
      CommonModule,
      UsersRoutingModule
    ],
    declarations: [
      routingComponents
    ],
    providers: [
    ]
})
export class UsersModule {}
