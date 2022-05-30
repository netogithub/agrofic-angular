import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Suelo } from 'src/app/models/catalogos/suelo.model';

export type SortColumnSuelos = keyof Suelo | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SuelosSortEvent {
  column: SortColumnSuelos;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortableSuelos]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SuelosSortableHeader {

  @Input() sortableSuelos: SortColumnSuelos = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SuelosSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortableSuelos, direction: this.direction});
  }
}
