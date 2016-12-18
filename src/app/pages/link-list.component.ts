import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";

import { ConfigService } from '../shared/config.service';
import { ErrorHandlerService } from "../error/error-handler.service";
import { UserClass } from "../auth/user.interface";

@Component({
    templateUrl: './link-list.component.html',
    styleUrls  : ['../../assets/scss/tables.scss']
})

export class LinkListComponent implements OnInit, OnDestroy {
    linkList: any[];

    constructor(private router: Router,
                private errorHandler: ErrorHandlerService) {
    };

    ngOnInit() {
        try {
            this.linkList = ConfigService.linkList;

        } catch (e) {
            this.errorHandler.traceError("[link-list] - ngOnInit - error", e, true);
        }
    };

    ngOnDestroy() {

    };
}
