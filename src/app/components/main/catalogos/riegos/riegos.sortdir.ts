import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Riego } from 'src/app/models/catalogos/riego.model';

export type SortColumnRiegos = keyof Riego | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface RiegosSortEvent {
  column: SortColumnRiegos;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortableRiegos]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class RiegosSortableHeader {

  @Input() sortableRiegos: SortColumnRiegos = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<RiegosSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortableRiegos, direction: this.direction});
  }
}
