import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

export type SortColumnUsuario = keyof Usuario | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface UsuariosSortEvent {
  column: SortColumnUsuario;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortableUsuarios]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class UsuariosSortableHeader {

  @Input() sortableUsuarios: SortColumnUsuario = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<UsuariosSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortableUsuarios, direction: this.direction});
  }
}
