import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { ErrorHandlerService } from "../error/error-handler.service";

import { BreadcrumbService } from "./breadcrumb.service";

@Component({
    selector: 'breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrump.component.scss']
})
export class BreadcrumbComponent {

    urls: string[];

    constructor(private router: Router,
                private errorHandler: ErrorHandlerService,
                private breadcrumbService: BreadcrumbService) {

        try {
            this.urls = new Array();
            this.urls.length = 0; //clear out array
            this.router.events.subscribe((navigationEnd: NavigationEnd) => {
                let urlNav = navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url;
                this.urls = this.breadcrumbService.createBreadcrumb(urlNav);
            });
        } catch (e) {
            this.errorHandler.traceError("[breadcrumb] - constructor - error", e, true);
        }
    };

    navigateTo(url: string): void {
        this.router.navigateByUrl(url);
    };

    getBreadcrumbName(url: string): string {
        return !url ? '' : this.breadcrumbService.getDisplayNameForRoute(url);
    };
}
