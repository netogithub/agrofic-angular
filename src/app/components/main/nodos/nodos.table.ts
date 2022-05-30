/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Nodo } from 'src/app/models/nodo.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumnNodo, SortDirection } from './nodos.sortdir';

interface SearchResult {
  nodos: Nodo[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumnNodo;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(nodos: Nodo[], column: SortColumnNodo, direction: string): Nodo[] {
  if (direction === '' || column === '') {
    return nodos;
  } else {
    return [...nodos].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(nodo: Nodo, term: string, pipe: PipeTransform) {
  return nodo.descripcion.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class NodosTable {
  private listaNodos!: Nodo[];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _nodos$ = new BehaviorSubject<Nodo[]>([]);
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
      this._nodos$.next(result.nodos);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  get nodos$() { return this._nodos$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumnNodo) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  llenarTabla(listaNodos: Nodo[]): void {
    this.listaNodos = listaNodos;
    this._nodos$.next(this.listaNodos);
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let nodos = sort(this.listaNodos, sortColumn, sortDirection);
    console.log("1. sort");
    console.log(nodos);

    // 2. filter
    nodos = nodos.filter(nodo => matches(nodo, searchTerm, this.pipe));
    const total = nodos.length;
    console.log("2. filter");
    console.log(nodos);

    // 3. paginate
    nodos = nodos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log("3. paginate");
    console.log(nodos);
    return of({nodos, total});
  }
}
