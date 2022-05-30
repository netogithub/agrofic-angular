/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Sitio } from 'src/app/models/sitio.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumnSitio, SortDirection } from './sitios.sortdir';

interface SearchResult {
  sitios: Sitio[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumnSitio;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(sitios: Sitio[], column: SortColumnSitio, direction: string): Sitio[] {
  if (direction === '' || column === '') {
    return sitios;
  } else {
    return [...sitios].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(sitio: Sitio, term: string, pipe: PipeTransform) {
  return sitio.descripcion.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class SitiosTable {
  private listaSitios!: Sitio[];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _sitios$ = new BehaviorSubject<Sitio[]>([]);
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
      this._sitios$.next(result.sitios);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  get sitios$() { return this._sitios$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumnSitio) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  llenarTabla(listaSitios: Sitio[]): void {
    this.listaSitios = listaSitios;
    this._sitios$.next(this.listaSitios);
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let sitios = sort(this.listaSitios, sortColumn, sortDirection);
    console.log("1. sort");
    console.log(sitios);

    // 2. filter
    sitios = sitios.filter(sitio => matches(sitio, searchTerm, this.pipe));
    const total = sitios.length;
    console.log("2. filter");
    console.log(sitios);

    // 3. paginate
    sitios = sitios.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log("3. paginate");
    console.log(sitios);
    return of({sitios, total});
  }
}
