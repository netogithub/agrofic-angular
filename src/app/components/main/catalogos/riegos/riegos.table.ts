/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Riego } from 'src/app/models/catalogos/riego.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumnRiegos, SortDirection } from './riegos.sortdir';

interface SearchResult {
  riegos: Riego[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumnRiegos;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(riegos: Riego[], column: SortColumnRiegos, direction: string): Riego[] {
  if (direction === '' || column === '') {
    return riegos;
  } else {
    return [...riegos].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(riegos: Riego, term: string, pipe: PipeTransform) {
  return riegos.descripcion.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class RiegosTable {
  private listaRiegos!: Riego[];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _riegos$ = new BehaviorSubject<Riego[]>([]);
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
      this._riegos$.next(result.riegos);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  get plantaciones$() { return this._riegos$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumnRiegos) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  llenarTabla(listaRiegos: Riego[]): void {
    this.listaRiegos = listaRiegos;
    this._riegos$.next(this.listaRiegos);
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let riegos = sort(this.listaRiegos, sortColumn, sortDirection);
    console.log("1. sort");
    console.log(riegos);

    // 2. filter
    riegos = riegos.filter(riegos => matches(riegos, searchTerm, this.pipe));
    const total = riegos.length;
    console.log("2. filter");
    console.log(riegos);

    // 3. paginate
    riegos = riegos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log("3. paginate");
    console.log(riegos);
    return of({riegos, total});
  }
}
