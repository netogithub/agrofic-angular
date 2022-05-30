import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { GLOBAL } from "../global"
import { Identidad } from 'src/app/models/auth/identidad.model';

@Injectable({
  providedIn: 'root'
})
export class IdentidadService {
  public url!: string;
  public identity!: any;
  public token!: any;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  signup(user: Identidad, gettoken = 'false'): Observable<any> {
    if (gettoken != 'false') {
      user.gettoken = gettoken;
    }
    let json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', json, { headers: headers });
  }

  getIdentity() {
    let storageIdentity = localStorage.getItem(GLOBAL.identity);
    let parseIdentity = JSON.parse(storageIdentity || '{}');
    if (parseIdentity != '{}') {
      this.identity = new Identidad(
        parseIdentity.id_usuario,
        parseIdentity.tipo_usuario,
        parseIdentity.nombre,
        parseIdentity.a_paterno,
        parseIdentity.a_materno,
        parseIdentity.descripcion,
        parseIdentity.email,
        parseIdentity.telefono,
        "",
        "",
        ""
      );
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let storagetoken = localStorage.getItem(GLOBAL.token);
    let token = JSON.parse(storagetoken || '{}');
    if (token != '{}') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
