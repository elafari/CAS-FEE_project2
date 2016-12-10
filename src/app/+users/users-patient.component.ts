import { Component, Input, OnInit } from '@angular/core';

import { ConfigService } from "../shared/config.service";
import { DataService } from "../shared/data.service";
import { ErrorHandlerService } from "../error/error-handler.service";
import { LoggerService } from "../log/logger.service";

@Component({
    selector   : '[users-patient]',
    templateUrl: 'users-patient.component.html',
    styleUrls  : ['../../assets/scss/cards.scss']
})
export class UsersPatientComponent implements OnInit {
    @Input() user: any;
    @Input() patient: any;

    isDevMode: boolean = ConfigService.devMode;
    mainAdmin: string = ConfigService.mainAdmin;
    patientKey: string;

    showModalDialogDelete: string;
    simulateDeletion: boolean;

    constructor(private dataService: DataService,
                private errorHandler: ErrorHandlerService,
                private logger: LoggerService) {
    };

    ngOnInit() {
        try {
            this.simulateDeletion = this.isDevMode;
            this.patientKey = this.patient.$key;
        } catch (e) {
            this.errorHandler.traceError("[users-patient] - ngOnInit - error", e, true);
        }
    }

    deletePatient() {
        try {
            let simulate = this.simulateDeletion;
            this.showModalDialogDelete = "";
            this.logger.info("[user-patient] - deletePatient - patient: " + this.patient.$key + " - simulation: " + simulate);
            this.dataService.deletePatient(this.patient.$key, simulate);
        } catch (e) {
            this.errorHandler.traceError("[users-patient] - deletePatient - error", e, true);
        }
    };

    showDeleteDialog(dialogAttribute) {
        this.simulateDeletion = this.isDevMode;
        this.showModalDialogDelete = dialogAttribute;
    };
}
