import {DecimalPipe} from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Suelo } from 'src/app/models/catalogos/suelo.model';
import { SuelosSortableHeader, SuelosSortEvent } from './suelos.sortdir';
import { SuelosService } from 'src/app/services/main/catalogos/suelos.service';
import { SuelosTable } from './suelos.table';

import { IdentidadService } from 'src/app/services/auth/identidad.service';

@Component({
  selector: 'app-suelos',
  templateUrl: './suelos.component.html',
  styleUrls: ['./suelos.component.css'],
  providers: [SuelosService, SuelosTable, DecimalPipe]
})
export class SuelosComponent implements OnInit {
  public listaSuelos!: Suelo[];

  public suelos$!: Observable<Suelo[]>;
  public total$!: Observable<number>;

  public editIcon = faEdit;
  public eraserIcon = faEraser;

  public token!: string;

  @ViewChildren(SuelosSortableHeader) headers!: QueryList<SuelosSortableHeader>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _suelosServices: SuelosService,
    public _suelosTable: SuelosTable,
    private _identidadService: IdentidadService
  ) {
    this.total$ = _suelosTable.total$;
    this.token = _identidadService.getToken();
  }

  ngOnInit(): void {
    this.listSuelos();
  }

  onSort({column, direction}: SuelosSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortableSuelos !== column) {
        header.direction = '';
      }
    });

    this._suelosTable.sortColumn = column;
    this._suelosTable.sortDirection = direction;
  }

  listSuelos() : void {
    this._suelosServices.listSuelos(this.token).subscribe(
      res => {
        this.listaSuelos = res;
        this._suelosTable.llenarTabla(this.listaSuelos);
        this._suelosTable.iniciar();
        this.suelos$ = this._suelosTable.plantaciones$;
      },
      err => {
        console.log(err);
      }
    )
  }

  createSuelos(): void {
    //
  }

  readSuelos(id: string): void {
    console.log("read");
  }

  updateSuelos(): void {
    //
  }

  deleteSuelos(id: string): void {
    console.log("delete");
  }

}
