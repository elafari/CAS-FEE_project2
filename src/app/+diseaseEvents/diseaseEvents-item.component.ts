import { Component, Input } from '@angular/core';

@Component({
  selector: '[diseaseEvents-item]',
  templateUrl: 'diseaseEvents-item.component.html'
})
export class DiseaseEventsItemComponent {
  @Input() diseaseEvent: any;
}

