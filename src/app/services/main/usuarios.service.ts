import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { GLOBAL } from "../global"

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public url!: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  listUsuarios(token: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'usuarios', { headers: headers });
  }

  createUsuario() {
    //
  }

  readUsuario() {
    //
  }

  updateUsuario() {
    //
  }

  deleteUsuario() {
    //
  }
}
