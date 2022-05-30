import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Nodo } from 'src/app/models/nodo.model';

export type SortColumnNodo = keyof Nodo | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface NodosSortEvent {
  column: SortColumnNodo;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortableNodos]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NodosSortableHeader {

  @Input() sortableNodos: SortColumnNodo = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<NodosSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortableNodos, direction: this.direction});
  }
}
