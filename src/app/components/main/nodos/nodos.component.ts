import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { NodosSortableHeader, NodosSortEvent } from './nodos.sortdir';
import { NodosService } from 'src/app/services/main/nodos.service';
import { NodosTable } from './nodos.table';
import { Nodo } from 'src/app/models/nodo.model';

import { IdentidadService } from 'src/app/services/auth/identidad.service';

@Component({
  selector: 'app-nodos',
  templateUrl: './nodos.component.html',
  styleUrls: ['./nodos.component.css'],
  providers: [NodosService, NodosTable, DecimalPipe]
})
export class NodosComponent implements OnInit {
  public listaNodos!: Nodo[];

  public nodos$!: Observable<Nodo[]>;
  public total$!: Observable<number>;

  public editIcon = faEdit;
  public eraserIcon = faEraser;

  public token!: string;

  @ViewChildren(NodosSortableHeader) headers!: QueryList<NodosSortableHeader>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _nodosService: NodosService,
    public _nodosTable: NodosTable,
    private _identidadService: IdentidadService
  ) {
    this.total$ = _nodosTable.total$;
    this.token = _identidadService.getToken();
  }

  ngOnInit(): void {
    this.listNodos();
  }

  onSort({column, direction}: NodosSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortableNodos !== column) {
        header.direction = '';
      }
    });

    this._nodosTable.sortColumn = column;
    this._nodosTable.sortDirection = direction;
  }

  searchNodos(): void {
    //
  }

  listNodos(): void {
    this._nodosService.listNodos(this.token).subscribe(
      res => {
        this.listaNodos = res;
        this._nodosTable.llenarTabla(this.listaNodos);
        this._nodosTable.iniciar();
        this.nodos$ = this._nodosTable.nodos$;
      },
      err => {
        console.log(err);
      }
    );
  }

  createNodos(): void {
    //
  }

  readNodos(id: string): void {
    console.log("read");
  }

  updateNodos(): void {
    //
  }

  deleteNodos(id: string): void {
    console.log("delete");
  }

}
