/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Sensor } from 'src/app/models/sensor.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumnSensor, SortDirection } from './sensores.sortdir';

interface SearchResult {
  sensores: Sensor[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumnSensor;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(sensores: Sensor[], column: SortColumnSensor, direction: string): Sensor[] {
  if (direction === '' || column === '') {
    return sensores;
  } else {
    return [...sensores].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(sensor: Sensor, term: string, pipe: PipeTransform) {
  return sensor.descripcion.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class SensoresTable {
  private listaSensores!: Sensor[];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _sensores$ = new BehaviorSubject<Sensor[]>([]);
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
      this._sensores$.next(result.sensores);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  get sensores$() { return this._sensores$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumnSensor) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  llenarTabla(listaSensores: Sensor[]): void {
    this.listaSensores = listaSensores;
    this._sensores$.next(this.listaSensores);
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let sensores = sort(this.listaSensores, sortColumn, sortDirection);
    console.log("1. sort");
    console.log(sensores);

    // 2. filter
    sensores = sensores.filter(sensor => matches(sensor, searchTerm, this.pipe));
    const total = sensores.length;
    console.log("2. filter");
    console.log(sensores);

    // 3. paginate
    sensores = sensores.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log("3. paginate");
    console.log(sensores);
    return of({sensores, total});
  }
}
