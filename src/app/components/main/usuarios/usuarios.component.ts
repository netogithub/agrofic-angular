import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosSortableHeader, UsuariosSortEvent } from './usuarios.sortdir';
import { UsuariosService } from 'src/app/services/main/usuarios.service';
import { UsuariosTable } from './usuarios.table';
import { IdentidadService } from 'src/app/services/auth/identidad.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public listaUsuarios!: Usuario[];

  public usuarios$!: Observable<Usuario[]>;
  public total$!: Observable<number>;

  public editIcon = faEdit;
  public eraserIcon = faEraser;

  public token!: string;

  @ViewChildren(UsuariosSortableHeader) headers!: QueryList<UsuariosSortableHeader>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuariosService: UsuariosService,
    public _usuariosTable: UsuariosTable,
    private _identidad: IdentidadService
  ) {
    this.total$ = _usuariosTable.total$;
    this.token = _identidad.getToken();
  }

  ngOnInit(): void {
    this.listUsuarios();
  }

  onSort({column, direction}: UsuariosSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortableUsuarios !== column) {
        header.direction = '';
      }
    });

    this._usuariosTable.sortColumn = column;
    this._usuariosTable.sortDirection = direction;
  }

  listUsuarios(): void{
    this._usuariosService.listUsuarios(this.token).subscribe(
      res => {
        this.listaUsuarios = res;
        this._usuariosTable.llenarTabla(this.listaUsuarios);
        this._usuariosTable.iniciar();
        this.usuarios$ = this._usuariosTable.usuarios$;
      },
      err => {
        console.log(err);
      }
    );
  }

  createUsuario(): void {
    //
  }

  readUsuario(id: string): void {
    //
  }

  updateUsuario(): void {
    //
  }

  deleteUsuario(id: string): void {
    console.log("delete");
  }

}
