import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdentidadService } from 'src/app/services/auth/identidad.service';
import { Identidad } from 'src/app/models/auth/identidad.model';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [IdentidadService]
})
export class LoginComponent implements OnInit {
  public token!: string;
  public identidad!: Identidad;
  public formulario!: Identidad;
  public status!: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _identidadService: IdentidadService
  ) {
    this.formulario = new Identidad("","","","","","","","","","","");
  }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm): void {
    this._identidadService.signup(this.formulario).subscribe(
      res => {
        console.log(res);
        this.identidad = new Identidad(
          res.user.id_usuario,
          res.user.tipo_usuario,
          res.user.nombre,
          res.user.a_paterno,
          res.user.a_materno,
          res.user.descripcion,
          res.user.email,
          res.user.telefono,
          "",
          "",
          ""
        );
        if (!this.identidad || !this.identidad.id_usuario) {
          this.status = 'error';
        } else {
          // Persistir datos del usuario
          localStorage.setItem(GLOBAL.identity, JSON.stringify(this.identidad));
          // Conseguir el token
          this.getToken();
        }
      },
      err => {
        var errorMessage = <any>err;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getToken(){
    this._identidadService.signup(this.formulario, 'true').subscribe(
      res => {
        this.token = res.token;
        if (this.token.length <= 0) {
          this.status = 'error';
        } else {
          // Persistir token del usuario
          localStorage.setItem(GLOBAL.token, JSON.stringify(this.token));
          this._router.navigate(['/']);
        }
      },
      err => {
        var errorMessage = <any>err;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

}
