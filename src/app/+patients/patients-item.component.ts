import { Component, Input } from '@angular/core';

@Component({
    selector   : '[patients-item]',
    templateUrl: 'patients-item.component.html',
    styleUrls  : ['../../assets/scss/cards.scss']
})
export class PatientsItemComponent {
    @Input() patient: any;
}
