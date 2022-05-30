import {DecimalPipe} from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Riego } from 'src/app/models/catalogos/riego.model';
import { RiegosSortableHeader, RiegosSortEvent} from './riegos.sortdir';
import { RiegosService } from 'src/app/services/main/catalogos/riegos.service';
import { RiegosTable } from './riegos.table';

import { IdentidadService } from 'src/app/services/auth/identidad.service';

@Component({
  selector: 'app-riegos',
  templateUrl: './riegos.component.html',
  styleUrls: ['./riegos.component.css'],
  providers: [RiegosService, RiegosTable, DecimalPipe]
})
export class RiegosComponent implements OnInit {
  public listaRiegos!: Riego[];

  public riegos$!: Observable<Riego[]>;
  public total$!: Observable<number>;

  public editIcon = faEdit;
  public eraserIcon = faEraser;

  public token!: string;

  @ViewChildren(RiegosSortableHeader) headers!: QueryList<RiegosSortableHeader>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _riegosServices: RiegosService,
    public _riegosTable: RiegosTable,
    private _identidadService: IdentidadService
  ) {
    this.total$ = _riegosTable.total$;
    this.token = _identidadService.getToken();
  }

  ngOnInit(): void {
    this.listRiegos();
  }

  onSort({column, direction}: RiegosSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortableRiegos !== column) {
        header.direction = '';
      }
    });

    this._riegosTable.sortColumn = column;
    this._riegosTable.sortDirection = direction;
  }

  listRiegos() : void {
    this._riegosServices.listRiegos(this.token).subscribe(
      res => {
        this.listaRiegos = res;
        this._riegosTable.llenarTabla(this.listaRiegos);
        this._riegosTable.iniciar();
        this.riegos$ = this._riegosTable.plantaciones$;
      },
      err => {
        console.log(err);
      }
    )
  }

  createRiegos(): void {
    //
  }

  readRiegos(id: string): void {
    console.log("read");
  }

  updateRiegos(): void {
    //
  }

  deleteRiegos(id: string): void {
    console.log("delete");
  }

}
