import { Injectable } from "@angular/core";
import { ErrorHandlerService } from "../error/error-handler.service";

@Injectable()
export class BreadcrumbService {

    constructor(private errorHandler: ErrorHandlerService) {
    };

    private routeBreadcrumbNames = {};

    createBreadcrumb(urlNav: string) {
        try {
            let urls = new Array();
            urls.length = 0; //clear out array
            for (var item of this.breadcrumbDefinitions) {
                let regexPattern = new RegExp(item.pattern, "g");
                let regexResult = regexPattern.test(urlNav);
                if (regexResult) {
                    urls.push("/");
                    for (var param of item.params) {
                        urls.push(urlNav.substr(1, (urlNav.indexOf(param) + param.length - 1)));
                    }
                    let counter = 0;
                    for (var displayLink of item.display) {
                        this.addDisplayNameForRoute(urls[counter], displayLink);
                        counter++
                    }
                    break;
                }
            }
            return urls;
        } catch (e) {
            this.errorHandler.traceError("[breadcrumb-service] - createBreadcrumb - error", e, true);
        }
    };

    addDisplayNameForRoute(route: string, name: string): void {
        this.routeBreadcrumbNames[route] = name;
    };

    getDisplayNameForRoute(route: string): string {
        let displayName = this.routeBreadcrumbNames[route];
        if (!displayName) {
            displayName = "Home";
        }
        return displayName;
    };

    breadcrumbDefinitions = [
        // take care of the order: the longest match first
        {
            pattern: "^(?=.*patients)(?=.*diseaseCases)(?=.*diseaseEvents)(?=.*create).*$",
            params: ["patients", "diseaseCases", "diseaseEvents", "create"],
            display: ["Home", "Patients", "Cases", "Events", "create"]
        },
        {
            pattern: "^(?=.*patients)(?=.*diseaseCases)(?=.*diseaseEvents)(?=.*edit).*$",
            params: ["patients", "diseaseCases", "diseaseEvents", "edit"],
            display: ["Home", "Patients", "Cases", "Events", "edit"]
        },
        {
            pattern: "^(?=.*patients)(?=.*diseaseCases)(?=.*diseaseEvents).*$",
            params: ["patients", "diseaseCases", "diseaseEvents"],
            display: ["Home", "Patients", "Cases", "Events"]
        },
        {
            pattern: "^(?=.*patients)(?=.*diseaseCases)(?=.*create).*$",
            params: ["patients", "diseaseCases", "create"],
            display: ["Home", "Patients", "Cases", "create"]
        },
        {
            pattern: "^(?=.*patients)(?=.*diseaseCases)(?=.*edit).*$",
            params: ["patients", "diseaseCases", "edit"],
            display: ["Home", "Patients", "Cases", "edit"]
        },
        {
            pattern: "^(?=.*patients)(?=.*diseaseCases).*$",
            params: ["patients", "diseaseCases"],
            display: ["Home", "Patients", "Cases"]
        },
        {
            pattern: "^(?=.*patients)(?=.*create).*$",
            params: ["patients", "create"],
            display: ["Home", "Patients", "create"]
        },
        {
            pattern: "^(?=.*patients)(?=.*edit).*$",
            params: ["patients", "edit"],
            display: ["Home", "Patients", "edit"]
        },
        {
            pattern: "^(?=.*patients).*$",
            params: ["patients"],
            display: ["Home", "Patients"]
        },
        {
            pattern: "^(?=.*login).*$",
            params: ["login"],
            display: ["Home", "Login"]
        },
        {
            pattern: "^(?=.*register).*$",
            params: ["register"],
            display: ["Home", "Register"]
        },
        {
            pattern: "^(?=.*error).*$",
            params: ["error"],
            display: ["Home", "Error"]
        },
        {
            pattern: "^(?=.*loggedInData).*$",
            params: ["loggedInData"],
            display: ["Home", "Display login data"]
        },
        {
            pattern: "^(?=.*linkList).*$",
            params: ["linkList"],
            display: ["Home", "Project links"]
        },
        {
            pattern: "^(?=.*userAdmin).*$",
            params: ["userAdmin"],
            display: ["Home", "Edit user data"]
        },
        {
            pattern: "^(?=.*users).*$",
            params: ["users"],
            display: ["Home", "Users"]
        },
        {
            pattern: "\/home",
            params: [],
            display: []
        },
        {
            pattern: "\/",
            params: [],
            display: []
        }
    ];
}
