import { Component, Input } from '@angular/core';

import { Subscription } from "rxjs/Rx";

import { DataService } from "../shared/data.service";

@Component({
    selector   : '[diseaseCases-item]',
    templateUrl: 'diseaseCases-item.component.html',
    styleUrls  : ['../../assets/scss/cards.scss']
})
export class DiseaseCasesItemComponent {
    @Input() diseaseCase: any;
    @Input() patientKey: string;

    constructor(private dataService: DataService) {
    };
}
