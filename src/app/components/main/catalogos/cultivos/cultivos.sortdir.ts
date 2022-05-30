import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Cultivo} from 'src/app/models/catalogos/cultivo.model';

export type SortColumn = keyof Cultivo | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface CultivosSortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortableCultivos]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class CultivosSortableHeader {

  @Input() sortableCultivos: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<CultivosSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortableCultivos, direction: this.direction});
  }
}
