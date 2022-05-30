import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Sitio } from 'src/app/models/sitio.model';

export type SortColumnSitio = keyof Sitio | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SitiosSortEvent {
  column: SortColumnSitio;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortableSitios]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SitiosSortableHeader {

  @Input() sortableSitios: SortColumnSitio = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SitiosSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortableSitios, direction: this.direction});
  }
}
