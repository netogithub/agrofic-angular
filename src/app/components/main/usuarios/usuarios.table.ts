/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Usuario } from 'src/app/models/usuario.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumnUsuario, SortDirection } from './usuarios.sortdir';

interface SearchResult {
  usuarios: Usuario[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumnUsuario;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(usuarios: Usuario[], column: SortColumnUsuario, direction: string): Usuario[] {
  if (direction === '' || column === '') {
    return usuarios;
  } else {
    return [...usuarios].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(usuario: Usuario, term: string, pipe: PipeTransform) {
  return usuario.descripcion.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class UsuariosTable {
  private listaUsuarios!: Usuario[];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _usuarios$ = new BehaviorSubject<Usuario[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private pipe: DecimalPipe
    ) {
      //
  }

  iniciar(): void {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._usuarios$.next(result.usuarios);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  get usuarios$() { return this._usuarios$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumnUsuario) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  llenarTabla(listaUsuarios: Usuario[]): void {
    this.listaUsuarios = listaUsuarios;
    this._usuarios$.next(this.listaUsuarios);
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let usuarios = sort(this.listaUsuarios, sortColumn, sortDirection);
    console.log("1. sort");
    console.log(usuarios);

    // 2. filter
    usuarios = usuarios.filter(usuario => matches(usuario, searchTerm, this.pipe));
    const total = usuarios.length;
    console.log("2. filter");
    console.log(usuarios);

    // 3. paginate
    usuarios = usuarios.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log("3. paginate");
    console.log(usuarios);
    return of({usuarios, total});
  }
}
