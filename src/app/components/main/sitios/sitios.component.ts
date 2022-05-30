import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { SitiosSortableHeader, SitiosSortEvent } from './sitios.sortdir';
import { SitiosService } from 'src/app/services/main/sitios.service';
import { SitiosTable } from './sitios.table';
import { Sitio } from 'src/app/models/sitio.model';

import { IdentidadService } from 'src/app/services/auth/identidad.service';

@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.css'],
  providers: [SitiosService, SitiosTable, DecimalPipe]
})
export class SitiosComponent implements OnInit {
  public listaSitios!: Sitio[];

  public sitios$!: Observable<Sitio[]>;
  public total$!: Observable<number>;

  public editIcon = faEdit;
  public eraserIcon = faEraser;

  public token!: string;

  @ViewChildren(SitiosSortableHeader) headers!: QueryList<SitiosSortableHeader>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _sitiosService: SitiosService,
    public _sitiosTable: SitiosTable,
    private _identidadService: IdentidadService
  ) {
    this.total$ = _sitiosTable.total$;
    this.token = _identidadService.getToken();
  }

  ngOnInit(): void {
    this.listSitios();
  }

  onSort({column, direction}: SitiosSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortableSitios !== column) {
        header.direction = '';
      }
    });

    this._sitiosTable.sortColumn = column;
    this._sitiosTable.sortDirection = direction;
  }

  listSitios(): void {
    this._sitiosService.listaSitios(this.token).subscribe(
      res => {
        this.listaSitios = res;
        this._sitiosTable.llenarTabla(this.listaSitios);
        this._sitiosTable.iniciar();
        this.sitios$ = this._sitiosTable.sitios$;
      },
      err => {
        console.log(err);
      }
    );
  }

  createSitios(): void {
    //
  }

  readSitios(id: string): void {
    console.log("read");
  }

  updateSitios(): void {
    //
  }

  deleteSitios(id: string): void {
    console.log("delete");
  }

}
