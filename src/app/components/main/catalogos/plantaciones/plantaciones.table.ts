/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Plantacion } from 'src/app/models/catalogos/plantacion.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumnPlantacion, SortDirection } from './plantaciones.sortdir';

interface SearchResult {
  plantaciones: Plantacion[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumnPlantacion;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(plantaciones: Plantacion[], column: SortColumnPlantacion, direction: string): Plantacion[] {
  if (direction === '' || column === '') {
    return plantaciones;
  } else {
    return [...plantaciones].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(plantacion: Plantacion, term: string, pipe: PipeTransform) {
  return plantacion.descripcion.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class PlantacionesTable {
  private listaPlantaciones!: Plantacion[];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _plantaciones$ = new BehaviorSubject<Plantacion[]>([]);
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
      this._plantaciones$.next(result.plantaciones);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  get plantaciones$() { return this._plantaciones$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumnPlantacion) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  llenarTabla(listaPlantaciones: Plantacion[]): void {
    this.listaPlantaciones = listaPlantaciones;
    this._plantaciones$.next(this.listaPlantaciones);
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let plantaciones = sort(this.listaPlantaciones, sortColumn, sortDirection);
    console.log("1. sort");
    console.log(plantaciones);

    // 2. filter
    plantaciones = plantaciones.filter(plantacion => matches(plantacion, searchTerm, this.pipe));
    const total = plantaciones.length;
    console.log("2. filter");
    console.log(plantaciones);

    // 3. paginate
    plantaciones = plantaciones.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log("3. paginate");
    console.log(plantaciones);
    return of({plantaciones, total});
  }
}
