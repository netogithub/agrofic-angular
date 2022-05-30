import {DecimalPipe} from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Sensor } from 'src/app/models/sensor.model';
import { SensoresSortableHeader, SensoresSortEvent } from './sensores.sortdir';
import { SensoresService } from 'src/app/services/main/sensores.service';
import { SensoresTable } from './sensores.table';
import { IdentidadService } from 'src/app/services/auth/identidad.service';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.css'],
  providers: [SensoresService, SensoresTable, DecimalPipe]
})
export class SensoresComponent implements OnInit {
  public listaSensores!: Sensor[];

  public sensores$!: Observable<Sensor[]>;
  public total$!: Observable<number>;

  public editIcon = faEdit;
  public eraserIcon = faEraser;

  public token!: string;

  @ViewChildren(SensoresSortableHeader) headers!: QueryList<SensoresSortableHeader>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _sensoresService: SensoresService,
    public _sensoresTable: SensoresTable,
    private _identidadService: IdentidadService
  ) {
    this.total$ = _sensoresTable.total$;
    this.token = _identidadService.getToken();
  }

  ngOnInit(): void {
    this.listSensores();
  }

  onSort({column, direction}: SensoresSortEvent) {
    this.headers.forEach(header => {
      if (header.sortableSensores !== column) {
        header.direction = '';
      }
    });

    this._sensoresTable.sortColumn = column;
    this._sensoresTable.sortDirection = direction;
  }

  listSensores(): void {
    this._sensoresService.listSensores(this.token).subscribe(
      res => {
        this.listaSensores = res;
        this._sensoresTable.llenarTabla(this.listaSensores);
        this._sensoresTable.iniciar();
        this.sensores$ = this._sensoresTable.sensores$;
      },
      err => {
        console.log(err);
      }
    );
  }

  createSensores(): void {
    //
  }

  readSensores(id: string): void {
    console.log("read");
  }

  updateSensores(): void {
    //
  }

  deleteSensores(id: string): void {
    console.log("delete");
  }

}
