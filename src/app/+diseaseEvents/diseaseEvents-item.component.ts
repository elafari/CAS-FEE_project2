import { Component, Input } from '@angular/core';

@Component({
    selector   : '[diseaseEvents-item]',
    templateUrl: 'diseaseEvents-item.component.html',
    styleUrls  : ['../../assets/scss/cards.scss']
})
export class DiseaseEventsItemComponent {
    @Input() diseaseEvent: any;
}
