import { Component, OnInit } from '@angular/core';

import { DataTestService } from "./dataTest.service";
import { DataProviderService } from "./serviceProvider/dataProvider.service";

@Component({
    templateUrl: './dataTest.component.html',
    providers  : [DataTestService, DataProviderService]
})
export class DataTestComponent implements OnInit {

    town: {
        name: string
    };
    passedTest = false;
    data: any;

    constructor(private dataTestService: DataTestService,
                private dataProviderService: DataProviderService) {
    }

    ngOnInit() {
        this.town = this.dataTestService.town;
        this.dataProviderService.getDetails()
            .then((data: any) =>
                this.data = data
            );
    }
}
