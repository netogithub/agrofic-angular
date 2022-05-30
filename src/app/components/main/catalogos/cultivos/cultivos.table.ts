/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Cultivo } from "src/app/models/catalogos/cultivo.model";
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './cultivos.sortdir';

interface SearchResult {
  cultivos: Cultivo[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(cultivo: Cultivo[], column: SortColumn, direction: string): Cultivo[] {
  if (direction === '' || column === '') {
    return cultivo;
  } else {
    return [...cultivo].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(cultivo: Cultivo, term: string, pipe: PipeTransform) {
  return cultivo.descripcion.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class CultivosTable {
  private listaCultivos!: Cultivo[];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _cultivos$ = new BehaviorSubject<Cultivo[]>([]);
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
      this._cultivos$.next(result.cultivos);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  get cultivos$() { return this._cultivos$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  llenarTabla(listaCultivos: Cultivo[]): void {
    this.listaCultivos = listaCultivos;
    this._cultivos$.next(this.listaCultivos);
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let cultivos = sort(this.listaCultivos, sortColumn, sortDirection);
    console.log("1. sort");
    console.log(cultivos);

    // 2. filter
    cultivos = cultivos.filter(cultivos => matches(cultivos, searchTerm, this.pipe));
    const total = cultivos.length;
    console.log("2. filter");
    console.log(cultivos);

    // 3. paginate
    cultivos = cultivos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log("3. paginate");
    console.log(cultivos);
    return of({cultivos, total});
  }
}
