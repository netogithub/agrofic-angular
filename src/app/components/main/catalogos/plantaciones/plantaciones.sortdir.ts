import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Plantacion } from 'src/app/models/catalogos/plantacion.model';

export type SortColumnPlantacion = keyof Plantacion | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface PlantacionesSortEvent {
  column: SortColumnPlantacion;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortablePlantaciones]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class PlantacionesSortableHeader {

  @Input() sortablePlantaciones: SortColumnPlantacion = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<PlantacionesSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortablePlantaciones, direction: this.direction});
  }
}
