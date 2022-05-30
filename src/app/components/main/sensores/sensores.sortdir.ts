import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Sensor } from 'src/app/models/sensor.model';

export type SortColumnSensor = keyof Sensor | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SensoresSortEvent {
  column: SortColumnSensor;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortableSensores]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SensoresSortableHeader {

  @Input() sortableSensores: SortColumnSensor = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SensoresSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortableSensores, direction: this.direction});
  }
}
