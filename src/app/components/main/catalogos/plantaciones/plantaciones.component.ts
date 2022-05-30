import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { PlantacionesSortableHeader, PlantacionesSortEvent} from './plantaciones.sortdir';
import { PlantacionesService } from 'src/app/services/main/catalogos/plantaciones.service';
import { PlantacionesTable } from './plantaciones.table';
import { Plantacion } from 'src/app/models/catalogos/plantacion.model';

import { IdentidadService } from 'src/app/services/auth/identidad.service';

@Component({
  selector: 'app-plantaciones',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './plantaciones.component.html',
  styleUrls: ['./plantaciones.component.css'],
  providers: [PlantacionesService, PlantacionesTable, DecimalPipe]
})
export class PlantacionesComponent implements OnInit {
  public listaPlantaciones!: Plantacion[];

  public plantaciones$!: Observable<Plantacion[]>;
  public total$!: Observable<number>;
  public sortedColumn!: string;
  public sortedDirection!: string;

  public editIcon = faEdit;
  public eraserIcon = faEraser;

  public token!: string;

  @ViewChildren(PlantacionesSortableHeader) headers!: QueryList<PlantacionesSortableHeader>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _plantacionesService: PlantacionesService,
    public _plantacionesTable: PlantacionesTable,
    private _identidadService: IdentidadService
  ) {
    this.total$ = _plantacionesTable.total$;
    this.token = _identidadService.getToken();
  }

  ngOnInit(): void {
    this.listPlantaciones();
  }

  onSort({column, direction}: PlantacionesSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortablePlantaciones !== column) {
        header.direction = '';
      }
    });
    this.sortedColumn = column;
    this.sortedDirection = direction;
    this._plantacionesTable.sortColumn = column;
    this._plantacionesTable.sortDirection = direction;
  }

  listPlantaciones(): void {
    this._plantacionesService.listPlantaciones(this.token).subscribe(
      res => {
        this.listaPlantaciones = res;
        this._plantacionesTable.llenarTabla(this.listaPlantaciones);
        this._plantacionesTable.iniciar();
        this.plantaciones$ = this._plantacionesTable.plantaciones$;
      },
      err => {
        console.log(err);
      }
    );
  }

  createPlantacion(): void {
    //
  }

  readPlantacion(id: string): void {
    console.log("read");
  }

  updatePlantacion(): void {
    //
  }

  deletePlantacion(id: string): void {
    console.log("delete");
  }

}
