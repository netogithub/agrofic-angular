import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Cultivo } from 'src/app/models/catalogos/cultivo.model';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';

import { CultivosSortableHeader, CultivosSortEvent} from 'src/app/components/main/catalogos/cultivos/cultivos.sortdir';
import { CultivosService } from 'src/app/services/main/catalogos/cultivos.service';
import { CultivosTable } from './cultivos.table';

import { IdentidadService } from 'src/app/services/auth/identidad.service';

@Component({
  selector: 'app-cultivos',
  templateUrl: './cultivos.component.html',
  styleUrls: ['./cultivos.component.css'],
  providers: [CultivosService, CultivosTable, DecimalPipe]
})
export class CultivosComponent implements OnInit {
  public listaCultivos!: Cultivo[];

  public cultivos$!: Observable<Cultivo[]>;
  public total$!: Observable<number>;

  public editIcon = faEdit;
  public eraserIcon = faEraser;

  public token!: string;

  @ViewChildren(CultivosSortableHeader) headers!: QueryList<CultivosSortableHeader>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cultivosService: CultivosService,
    public _cultivosTable: CultivosTable,
    private _identidadService: IdentidadService
  ) {
    this.total$ = _cultivosTable.total$;
    this.token = _identidadService.getToken();
  }

  ngOnInit(): void {
    this.listCultivos();
  }

  onSort({column, direction}: CultivosSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortableCultivos !== column) {
        header.direction = '';
      }
    });

    this._cultivosTable.sortColumn = column;
    this._cultivosTable.sortDirection = direction;
  }

  listCultivos(): void {
    this._cultivosService.listCultivos(this.token).subscribe(
      res => {
        this.listaCultivos = res;
        console.log(res);
        this._cultivosTable.llenarTabla(this.listaCultivos);
        this._cultivosTable.iniciar();
        this.cultivos$ = this._cultivosTable.cultivos$;
      },
      err => {
        console.log(err);
      }
    );
  }

  createCultivos(): void {
    //
  }

  readCultivos(id: string): void {
    console.log("read");
  }

  updateCultivos(): void {
    //
  }

  deleteCultivos(id: string): void {
    console.log("delete");
  }

}
