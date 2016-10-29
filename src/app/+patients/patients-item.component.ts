import { Component, Input } from '@angular/core';

@Component({
  selector: '[patients-item]',
  templateUrl: 'patients-item.component.html'
})
export class PatientsItemComponent {
  @Input() patient: any;
}

