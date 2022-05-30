/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Suelo } from 'src/app/models/catalogos/suelo.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumnSuelos, SortDirection } from './suelos.sortdir';

interface SearchResult {
  suelos: Suelo[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumnSuelos;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(suelos: Suelo[], column: SortColumnSuelos, direction: string): Suelo[] {
  if (direction === '' || column === '') {
    return suelos;
  } else {
    return [...suelos].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}
function matches(suelos: Suelo, term: string, pipe: PipeTransform) {
  return suelos.descripcion.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class SuelosTable {
  private listaSuelos!: Suelo[];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _suelos$ = new BehaviorSubject<Suelo[]>([]);
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
      this._suelos$.next(result.suelos);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  get plantaciones$() { return this._suelos$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumnSuelos) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  llenarTabla(listaSuelos: Suelo[]): void {
    this.listaSuelos = listaSuelos;
    this._suelos$.next(this.listaSuelos);
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let suelos = sort(this.listaSuelos, sortColumn, sortDirection);
    console.log("1. sort");
    console.log(suelos);

    // 2. filter
    suelos = suelos.filter(suelos => matches(suelos, searchTerm, this.pipe));
    const total = suelos.length;
    console.log("2. filter");
    console.log(suelos);

    // 3. paginate
    suelos = suelos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log("3. paginate");
    console.log(suelos);
    return of({suelos, total});
  }
}
